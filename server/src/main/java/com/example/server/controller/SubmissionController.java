package com.example.server.controller;

import com.example.server.entities.Submission;
import com.example.server.entities.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Long.parseLong;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;
    private final UserRepository userRepository;

    @Autowired
    public SubmissionController(SubmissionService submissionService, UserRepository userRepository) {
        this.submissionService = submissionService;
        this.userRepository = userRepository;
    }

    // Endpoint to create a submission
    @PostMapping("/create")
    public ResponseEntity<?> createSubmission(
            @RequestParam String assignmentId,
            @RequestParam String studentId,
            @RequestParam MultipartFile document) {
        try {
            // Get the currently authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long currentUserId = ((User) authentication.getPrincipal()).getId();
            Long parsedStuId = parseLong(studentId);
            Long parsedAssId = parseLong(assignmentId);
            // Ensure the user is the student submitting the assignment
            if (!currentUserId.equals(parsedStuId)) {
                return ResponseEntity.status(403).body("You can only submit assignments as yourself.");
            }

            // Proceed with creating the submission
            Submission createdSubmission = submissionService.createSubmission(parsedAssId, parsedStuId, document);
            return ResponseEntity.ok(createdSubmission);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving submission: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // Endpoint to get all submissions for a specific assignment
//    @GetMapping("/assignment/{assignmentId}")
//    public ResponseEntity<List<Submission>> getSubmissionsByAssignment(@PathVariable Long assignmentId) {
//        List<Submission> submissions = submissionService.getSubmissionsByAssignment(assignmentId);
//        if (submissions.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(submissions);
//    }
    @GetMapping("/assignment/{assignmentId}")
    public ResponseEntity<List<SubmissionWithStudent>> getSubmissionsByAssignment(@PathVariable Long assignmentId) {
        List<Submission> submissions = submissionService.getSubmissionsByAssignment(assignmentId);

        if (submissions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Fetch student data for each submission
        List<SubmissionWithStudent> submissionsWithStudents = new ArrayList<>();
        for (Submission submission : submissions) {
            User student = userRepository.findById(submission.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));
            submissionsWithStudents.add(new SubmissionWithStudent(submission, student));
        }

        return ResponseEntity.ok(submissionsWithStudents);
    }

    // Create a DTO to return both Submission and User (Student) data
    public class SubmissionWithStudent {
        private Submission submission;
        private User student;

        public SubmissionWithStudent(Submission submission, User student) {
            this.submission = submission;
            this.student = student;
        }

        public Submission getSubmission() {
            return submission;
        }

        public User getStudent() {
            return student;
        }
    }



    // Endpoint to get a specific submission by assignment and student
    @GetMapping("/assignment/{assignmentId}/student/{studentId}")
    public ResponseEntity<Submission> getSubmission(@PathVariable Long assignmentId, @PathVariable Long studentId) {
        Submission submission = submissionService.getSubmission(assignmentId, studentId);
        if (submission == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(submission);
    }
}
