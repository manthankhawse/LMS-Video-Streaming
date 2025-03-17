package com.example.server.controller;

import com.example.server.entities.Assignment;
import com.example.server.entities.Course;
import com.example.server.entities.User;
import com.example.server.service.AssignmentService;
import com.example.server.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static java.lang.Long.parseLong;

@RestController
@RequestMapping("/api/v1/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;
    private final CourseRepository courseRepository;

    @Autowired
    public AssignmentController(AssignmentService assignmentService, CourseRepository courseRepository) {
        this.assignmentService = assignmentService;
        this.courseRepository = courseRepository;
    }

    // Endpoint to create an assignment with multiple documents (files)
    @PostMapping("/create")
    public ResponseEntity<?> createAssignment(
            @RequestParam String courseId,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam List<MultipartFile> documents) {
        try {
            // Get the currently authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            Long parsedId = parseLong(courseId);
            // Check if the user is the instructor of the course
            Course course = courseRepository.findById(parsedId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            if (!course.getInstructor().getId().equals(currentUser.getId())) {
                return ResponseEntity.status(403).body("You are not authorized to create assignments for this course.");
            }

            // Proceed with creating the assignment
            Assignment createdAssignment = assignmentService.createAssignment(parsedId, title, description, documents);
            return ResponseEntity.ok(createdAssignment);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving documents: " + e.getMessage());
        }
    }

    @GetMapping("/course/{courseId}/student")
    public ResponseEntity<List<Map<String, Object>>> getAssignmentsForStudent(@PathVariable Long courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<Map<String, Object>> result = assignmentService.getAssignmentsWithSubmissions(courseId, currentUser.getId());

        if (result.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(result);
    }

    // Endpoint to get all assignments for a specific course
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Assignment>> getAssignmentsByCourse(@PathVariable Long courseId) {
        List<Assignment> assignments = assignmentService.getAssignmentsByCourse(courseId);
        if (assignments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(assignments);
    }
}
