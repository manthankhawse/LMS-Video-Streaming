package com.example.server.repository;

import com.example.server.entities.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByAssignmentIdOrderBySubmittedAtDesc(Long assignmentId);
    Submission findByAssignmentIdAndStudentId(Long assignmentId, Long studentId);
}
