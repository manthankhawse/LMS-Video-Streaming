package com.example.server.controller;

import com.example.server.entities.CourseContent;
import com.example.server.entities.Section;
import com.example.server.entities.User;
import com.example.server.service.CourseContentService;
import com.example.server.service.SectionService;
import com.example.server.service.VideoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

import static java.lang.Long.parseLong;

@RestController
@RequestMapping("/api/v1/course-content")
public class CourseContentController {
    private final CourseContentService courseContentService;
    private final SectionService sectionService;
    private final VideoService videoService;

    public CourseContentController(CourseContentService courseContentService, SectionService sectionService, VideoService videoService) {
        this.courseContentService = courseContentService;
        this.sectionService = sectionService;
        this.videoService = videoService;
    }

    @GetMapping("/{sectionId}")
    public ResponseEntity<List<CourseContent>> getCourseContentBySection(@PathVariable Long sectionId) {
        return ResponseEntity.ok(courseContentService.getCourseContentBySection(sectionId));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCourseContent(
            @RequestParam("sectionId") String sectionId,
            @RequestParam("title") String title,
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestParam(value = "pdf", required = false) MultipartFile pdf,
            Authentication authentication
    ) {
        System.out.println("Controller called");
        User instructor = (User) authentication.getPrincipal();

        Section section = sectionService.getSectionById(parseLong(sectionId));
        System.out.println(section);
        if (!Objects.equals(instructor.getId(), section.getCourse().getInstructor().getId())) {
            return ResponseEntity.status(403).body("You are not authorized to add content to this section.");
        }

        CourseContent courseContent = new CourseContent();
        courseContent.setTitle(title);
        courseContent.setSection(section);

        // Handle file uploads
        if (video != null) {
            System.out.println("processing video");
            courseContent.setVideoUrl(videoService.processVideo(video));
        }
        if (pdf != null) {
            courseContent.setPdfUrl(uploadFile(pdf));
        }

        CourseContent createdContent = courseContentService.createCourseContent(courseContent);
        return ResponseEntity.ok(createdContent);
    }

    @GetMapping("/stream/app/videos_hls/{videoUrl}/**")
    public ResponseEntity<Resource> streamHLS(@PathVariable String videoUrl, HttpServletRequest request) {
        try {
            String requestUri = request.getRequestURI();
            System.out.println("Request URI: " + requestUri);

            // Extract the file name (either .m3u8 or .ts) from the request URI
            String fileName = requestUri.substring(requestUri.lastIndexOf("/") + 1);

            // Construct the path for the requested file
            Path filePath = Paths.get("app/videos_hls", videoUrl, fileName);
            System.out.println("Attempting to access file: " + filePath);

            // Load the requested file as a resource
            Resource fileResource = new UrlResource(filePath.toUri());

            if (!fileResource.exists() || !fileResource.isReadable()) {
                System.out.println("File not found or not readable: " + filePath);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Set the appropriate content type
            String contentType = fileName.endsWith(".m3u8") ? "application/vnd.apple.mpegurl" : "video/mp2t"; // .ts segments
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(fileResource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
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
