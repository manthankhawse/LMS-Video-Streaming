package com.example.server.controller;

import com.example.server.entities.CourseContent;
import com.example.server.entities.Section;
import com.example.server.entities.User;
import com.example.server.service.CourseContentService;
import com.example.server.service.SectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/course-content")
public class CourseContentController {
    private final CourseContentService courseContentService;
    private final SectionService sectionService;

    public CourseContentController(CourseContentService courseContentService, SectionService sectionService) {
        this.courseContentService = courseContentService;
        this.sectionService = sectionService;
    }

    @GetMapping("/{sectionId}")
    public ResponseEntity<List<CourseContent>> getCourseContentBySection(@PathVariable Long sectionId) {
        return ResponseEntity.ok(courseContentService.getCourseContentBySection(sectionId));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCourseContent(
            @RequestParam("sectionId") Long sectionId,
            @RequestParam("title") String title,
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestParam(value = "pdf", required = false) MultipartFile pdf,
            Authentication authentication
    ) {
        User instructor = (User) authentication.getPrincipal();
        Section section = sectionService.getSectionById(sectionId);

        if (!Objects.equals(instructor.getId(), section.getCourse().getInstructor().getId())) {
            return ResponseEntity.status(403).body("You are not authorized to add content to this section.");
        }

        CourseContent courseContent = new CourseContent();
        courseContent.setTitle(title);
        courseContent.setSection(section);

        // Handle file uploads
        if (video != null) {
            courseContent.setVideoUrl(uploadFile(video));
        }
        if (pdf != null) {
            courseContent.setPdfUrl(uploadFile(pdf));
        }

        CourseContent createdContent = courseContentService.createCourseContent(courseContent);
        return ResponseEntity.ok(createdContent);
    }

    @PutMapping("/{contentId}/update-position")
    public ResponseEntity<?> updateContentPosition(
            @PathVariable Long contentId,
            @RequestParam("newPosition") int newPosition,
            Authentication authentication
    ) {
        User instructor = (User) authentication.getPrincipal();
        CourseContent content = courseContentService.getCourseContentById(contentId);

        if (!Objects.equals(instructor.getId(), content.getSection().getCourse().getInstructor().getId())) {
            return ResponseEntity.status(403).body("You are not authorized to update this content.");
        }

        courseContentService.updateCourseContentPosition(contentId, newPosition);
        return ResponseEntity.ok().body("Content position updated.");
    }

    @DeleteMapping("/{contentId}")
    public ResponseEntity<?> deleteCourseContent(@PathVariable Long contentId, Authentication authentication) {
        User instructor = (User) authentication.getPrincipal();
        CourseContent content = courseContentService.getCourseContentById(contentId);

        if (!Objects.equals(instructor.getId(), content.getSection().getCourse().getInstructor().getId())) {
            return ResponseEntity.status(403).body("You are not authorized to delete this content.");
        }

        courseContentService.deleteCourseContent(contentId);
        return ResponseEntity.ok().body("Course content deleted successfully.");
    }

    private String uploadFile(MultipartFile file) {
        // Handle file upload logic (e.g., save to cloud storage or local server)
        return "uploaded_file_url"; // Replace with actual file storage URL
    }
}
