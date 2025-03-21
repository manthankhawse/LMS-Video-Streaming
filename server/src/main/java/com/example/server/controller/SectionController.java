package com.example.server.controller;

import com.example.server.entities.Course;
import com.example.server.entities.Section;
import com.example.server.entities.User;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.SectionRepository;
import com.example.server.service.SectionService;
import com.example.server.service.CourseService;
import com.example.server.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/sections")
public class SectionController {

    private final SectionService sectionService;
    private final CourseRepository courseRepository;
    private final SectionRepository sectionRepository;
    private final UserRepository userRepository;

    public SectionController(SectionService sectionService, CourseRepository courseRepository, UserRepository userRepository, SectionRepository sectionRepository) {
        this.sectionService = sectionService;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.sectionRepository = sectionRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSection(@RequestBody Section section, @RequestParam(value = "course_id", required = true) Long courseId) {
        User instructor = getAuthenticatedUser();
        Optional<Course> optionalCourse = courseRepository.findById(courseId);

        // Check if the course exists
        if (!optionalCourse.isPresent()) {
            return ResponseEntity.status(404).body("Course not found.");
        }

        Course course = optionalCourse.get();
        if (!Objects.equals(instructor.getId(), course.getInstructor().getId())) {
            return ResponseEntity.status(403).body("You are not the instructor of this course.");
        }
        section.setCourse(course);
        Section createdSection = sectionService.createSection(section);
        return ResponseEntity.ok(createdSection);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<List<Section>> getSectionsByCourse(@PathVariable Long courseId) {
        List<Section> sections = sectionService.getSectionsByCourse(courseId);
        return ResponseEntity.ok(sections);
    }

    @DeleteMapping("/{sectionId}")
    public ResponseEntity<?> deleteSection(@PathVariable Long sectionId) {
        // Get the authenticated user (instructor)
        User instructor = getAuthenticatedUser();

        // Find the section by ID, or throw exception if not found
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        // Check if the user is the instructor of the course
        if (!Objects.equals(instructor.getId(), section.getCourse().getInstructor().getId())) {
            return ResponseEntity.status(403).body("You are not authorized to delete this section.");
        }

        // Delete the section
        sectionService.deleteSection(sectionId);

        // Optionally: Adjust the positions of other sections in the course
        List<Section> remainingSections = sectionRepository.findByCourseIdOrderByPosition(section.getCourse().getId());
        remainingSections.forEach(s -> {
            if (s.getPosition() > section.getPosition()) {
                s.setPosition(s.getPosition() - 1);  // Shift positions down
                sectionRepository.save(s);  // Save updated section
            }
        });

        return ResponseEntity.ok().body("Section deleted successfully.");
    }


    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return userRepository.findById(currentUser.getId()).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
