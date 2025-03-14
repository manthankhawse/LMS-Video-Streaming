package com.example.server.controller;


import com.example.server.entities.Course;
import com.example.server.entities.Role;
import com.example.server.entities.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final UserRepository userRepository;



    @PostMapping("/create-course")
    public ResponseEntity<?> createCourse(@RequestBody Course request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
        User managedUser = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(managedUser.getRole()!= Role.INSTRUCTOR){
            return ResponseEntity.badRequest().body("Only instructors can create courses.");
        }
        request.setInstructor(managedUser);
        Course createdCourse = courseService.createCourse(request);
        return ResponseEntity.ok(createdCourse);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> getCourseInfo(@PathVariable Long id){
        return ResponseEntity.ok(courseService.getCourseInfo(id));
    }
}
