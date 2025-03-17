package com.example.server.controller;

import com.example.server.entities.Course;
import com.example.server.entities.Post;
import com.example.server.entities.User;
import com.example.server.repository.CourseRepository;
import com.example.server.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static java.lang.Long.parseLong;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final CourseRepository courseRepository;
    @Autowired
    public PostController(PostService postService, CourseRepository courseRepository) {
        this.postService = postService;
        this.courseRepository = courseRepository;
    }

    // Endpoint to create a post
    @PostMapping("/create")
    public ResponseEntity<?> createPost(
            @RequestParam String courseId,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam List<MultipartFile> documents) {
        try {
            // Get the currently authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            Long parsedId = parseLong(courseId);
            Course course = courseRepository.findById(parsedId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            if (!course.getInstructor().getId().equals(currentUser.getId())) {
                return ResponseEntity.status(403).body("You are not authorized to create assignments for this course.");
            }
            Post createdPost = postService.createPost(parsedId, title, description, documents);
            return ResponseEntity.ok(createdPost);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving post: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // Endpoint to get all posts for a specific course
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Post>> getPostsByCourse(@PathVariable Long courseId) {
        List<Post> posts = postService.getPostsByCourse(courseId);
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }
}
