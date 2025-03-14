package com.example.server.repository;

import com.example.server.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructorId(Long instructorId);
}