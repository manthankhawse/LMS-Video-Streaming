package com.example.server.service;

import com.example.server.entities.Post;
import com.example.server.entities.Course;
import com.example.server.repository.PostRepository;
import com.example.server.repository.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CourseRepository courseRepository;

    public PostService(PostRepository postRepository, CourseRepository courseRepository) {
        this.postRepository = postRepository;
        this.courseRepository = courseRepository;
    }

    public Post createPost(Long courseId, String title, String description, List<MultipartFile> documents) throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Create post object
        Post post = new Post();
        post.setTitle(title);
        post.setDescription(description);
        post.setCourse(course);

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

        // Set the document URLs in the post
        post.setDocuments(documentUrls);

        // Save the post to the database
        return postRepository.save(post);
    }

    public List<Post> getPostsByCourse(Long courseId) {
        return postRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
    }
}
