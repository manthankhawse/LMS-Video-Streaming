package com.example.server.service;

import com.example.server.entities.Assignment;
import com.example.server.entities.Course;
import com.example.server.entities.Submission;
import com.example.server.repository.AssignmentRepository;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.SubmissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final CourseRepository courseRepository;
    private final SubmissionRepository submissionRepository;

    public AssignmentService(AssignmentRepository assignmentRepository, CourseRepository courseRepository, SubmissionRepository submissionRepository) {
        this.assignmentRepository = assignmentRepository;
        this.courseRepository = courseRepository;
        this.submissionRepository = submissionRepository;
    }



//    public List<Map<String, Object>> getAssignmentsWithSubmissions(Long courseId, Long studentId) {
//        List<Assignment> assignments = assignmentRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
//
//        return assignments.stream().map(assignment -> {
//            Submission submission = submissionRepository.findByAssignmentIdAndStudentId(assignment.getId(), studentId);
//            return Map.of(
//                    "assignment", assignment,
//                    "submission", submission
//            );
//        }).collect(Collectors.toList());
//    }

//    public List<Map<String, Object>> getAssignmentsWithSubmissions(Long courseId, Long studentId) {
//        List<Assignment> assignments = assignmentRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
//
//        return assignments.stream().map(assignment -> {
//            Submission submission = submissionRepository.findByAssignmentIdAndStudentId(assignment.getId(), studentId);
//            Map<String, Object> result = new HashMap<>();
//            result.put("assignment", assignment);
//            result.put("submission", submission); // Can be null
//            return result;
//        }).collect(Collectors.toList());
//    }

    public List<Map<String, Object>> getAssignmentsWithSubmissions(Long courseId, Long studentId) {
        List<Assignment> assignments = assignmentRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
        if (assignments == null) assignments = new ArrayList<>(); // Ensure it's not null

        return assignments.stream().map(assignment -> {
            Submission submission = submissionRepository.findByAssignmentIdAndStudentId(assignment.getId(), studentId);
            Map<String, Object> result = new HashMap<>();
            System.out.println("assignment "+ assignment);
            System.out.println("submission "+ submission);
            result.put("assignment", assignment);
            result.put("submission", submission); // This can be null, but it's fine in HashMap
            return result;
        }).collect(Collectors.toList());
    }



    public Assignment createAssignment(Long courseId, String title, String description, List<MultipartFile> documents) throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Create assignment object
        Assignment assignment = new Assignment();
        assignment.setTitle(title);
        assignment.setDescription(description);
        assignment.setCourse(course);

        // Handle document upload
        List<String> documentUrls = new ArrayList<>();
        String uploadDir = "app/uploads/";  // Folder to store uploaded files

        // Ensure the directory exists
        Files.createDirectories(Paths.get(uploadDir));

        // Process each document
        for (MultipartFile document : documents) {
            String fileName = System.currentTimeMillis() + "_" + document.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, document.getBytes());  // Save file to server

            // Add document URL to list
            documentUrls.add("/uploads/" + fileName);  // You may want to return relative URL
        }

        // Set the document URLs in the assignment
        assignment.setDocuments(documentUrls);

        // Save the assignment to the database
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAssignmentsByCourse(Long courseId) {
        return assignmentRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
    }
}
