package com.example.server.service;

import com.example.server.entities.CourseContent;
import com.example.server.repository.CourseContentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CourseContentService {
    private final CourseContentRepository courseContentRepository;

    public CourseContentService(CourseContentRepository courseContentRepository) {
        this.courseContentRepository = courseContentRepository;
    }

    public List<CourseContent> getCourseContentBySection(Long sectionId) {
        return courseContentRepository.findBySectionIdOrderByPosition(sectionId);
    }

    @Transactional
    public CourseContent createCourseContent(CourseContent courseContent) {
        List<CourseContent> existingContents = courseContentRepository.findBySectionIdOrderByPosition(courseContent.getSection().getId());

        // Set position dynamically (append at the end)
        courseContent.setPosition(existingContents.size() + 1);
        return courseContentRepository.save(courseContent);
    }

    public CourseContent getCourseContentById(Long contentId) {
        return courseContentRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Course content not found"));
    }

    @Transactional
    public void updateCourseContentPosition(Long contentId, int newPosition) {
        Optional<CourseContent> optionalContent = courseContentRepository.findById(contentId);

        if (optionalContent.isPresent()) {
            CourseContent content = optionalContent.get();
            content.setPosition(newPosition);
            courseContentRepository.save(content);
        }
    }

    @Transactional
    public void deleteCourseContent(Long contentId) {
        Optional<CourseContent> optionalContent = courseContentRepository.findById(contentId);

        if (optionalContent.isPresent()) {
            CourseContent contentToDelete = optionalContent.get();
            Long sectionId = contentToDelete.getSection().getId();
            int deletedPosition = contentToDelete.getPosition();

            // Delete the course content
            courseContentRepository.deleteById(contentId);

            // Fetch remaining contents and shift their positions
            List<CourseContent> contents = courseContentRepository.findBySectionIdOrderByPosition(sectionId);
            for (CourseContent content : contents) {
                if (content.getPosition() > deletedPosition) {
                    content.setPosition(content.getPosition() - 1);
                    courseContentRepository.save(content);
                }
            }
        }
    }
}
