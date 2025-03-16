package com.example.server.controller;


import com.example.server.dto.CourseDTO;
import com.example.server.entities.Course;
import com.example.server.entities.Role;
import com.example.server.entities.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.CourseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final UserRepository userRepository;

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<?> getCoursesByInstructor(@PathVariable Long instructorId) {
        try {
            // Fetch the instructor from the database
            User instructor = userRepository.findById(instructorId)
                    .orElseThrow(() -> new RuntimeException("Instructor not found"));

            // Ensure the user is actually an instructor
            if (instructor.getRole() != Role.INSTRUCTOR) {
                return ResponseEntity.badRequest().body("User is not an instructor.");
            }

            // Fetch the courses by the instructor
            return ResponseEntity.ok(courseService.getCoursesByInstructor(instructor));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching courses: " + e.getMessage());
        }
    }

    @PostMapping("/create-course")
    public ResponseEntity<?> createCourse(
            @RequestParam("course") String courseJson,
            @RequestParam("image") MultipartFile imageFile) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        User managedUser = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (managedUser.getRole() != Role.INSTRUCTOR) {
            return ResponseEntity.badRequest().body("Only instructors can create courses.");
        }

        try {
            // Convert JSON string to Course object
            ObjectMapper objectMapper = new ObjectMapper();
            Course request = objectMapper.readValue(courseJson, Course.class);

            // Store image on server
            String uploadDir = "app/uploads/"; // Folder where images will be saved
            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.createDirectories(filePath.getParent());  // Ensure directory exists
            Files.write(filePath, imageFile.getBytes());

            // Set image URL (relative path)
            request.setImageUrl("/uploads/" + fileName);

            request.setInstructor(managedUser);
            Course createdCourse = courseService.createCourse(request);
            return ResponseEntity.ok(createdCourse);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving course: " + e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllCourses() {
        try {
            // Get all courses from the service
            return ResponseEntity.ok(courseService.getAllCourses());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching courses: " + e.getMessage());
        }
    }


    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDTO> getCourse(@PathVariable Long courseId) {
        CourseDTO course = courseService.getCourseInfo(courseId);
        if (course == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(course);
    }


    @PostMapping("/{id}")
    public ResponseEntity<?> getCourseInfo(@PathVariable Long id){
        return ResponseEntity.ok(courseService.getCourseInfo(id));
    }
}
