package com.example.server.repository;

import com.example.server.entities.Assignment;
import com.example.server.entities.CourseContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseContentRepository extends JpaRepository<CourseContent, Long> {

    List<CourseContent> findBySectionIdOrderByPosition(Long sectionId);

    interface AssignmentRepository extends JpaRepository<Assignment, Long> {
        List<Assignment> findByCourseIdOrderByCreatedAtDesc(Long courseId);
    }
}
