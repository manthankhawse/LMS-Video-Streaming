package com.example.server.service;

import com.example.server.dto.CourseContentDTO;
import com.example.server.dto.CourseDTO;
import com.example.server.dto.SectionDTO;
import com.example.server.entities.Course;
import com.example.server.entities.User;
import com.example.server.repository.CourseContentRepository;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.SectionRepository;
import lombok.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// DTOs (Keep them in the same file)


@Service
@RequiredArgsConstructor
public class CourseService {
//    @Autowired
    private final CourseRepository courseRepository;
    private final SectionRepository sectionRepository;
    private final CourseContentRepository courseContentRepository;
//
//    public CourseService(CourseRepository courseRepository, SectionRepository sectionRepository, CourseContentRepository courseContentRepository) {
//        this.courseRepository = courseRepository;
//        this.sectionRepository = sectionRepository;
//        this.courseContentRepository = courseContentRepository;
//    }

    public Course createCourse(Course course){
        try{
            Course savedCourse = courseRepository.save(course);
            return savedCourse;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public List<Course> getCoursesByInstructor(User instructor) {
        // Assuming you have a method to fetch courses by instructor
        List<Course> courses = courseRepository.findByInstructorId(instructor.getId());
        return courses;
    }

    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

    @Transactional(readOnly = true)
    public CourseDTO getCourseInfo(Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            return null;
        }

        List<SectionDTO> sectionDTOs = sectionRepository.findByCourseIdOrderByPosition(courseId)
                .stream()
                .map(section -> {
                    List<CourseContentDTO> contentDTOs = courseContentRepository.findBySectionIdOrderByPosition(section.getId())
                            .stream()
                            .map(content -> CourseContentDTO.builder()
                                    .id(content.getId())
                                    .title(content.getTitle())
                                    .videoUrl(content.getVideoUrl())
                                    .position(content.getPosition())
                                    .pdfUrl(content.getPdfUrl())
                                    .build())
                            .collect(Collectors.toList());

                    return SectionDTO.builder()
                            .id(section.getId())
                            .title(section.getTitle())
                            .position(section.getPosition())
                            .contents(contentDTOs)
                            .build();
                })
                .collect(Collectors.toList());

        return CourseDTO.builder()
                .id(course.getId())
                .imageUrl(course.getImageUrl())
                .title(course.getTitle())
                .description(course.getDescription())
                .price(course.getPrice())
                .published(course.getPublished())
                .sections(sectionDTOs)
                .build();
    }
}
