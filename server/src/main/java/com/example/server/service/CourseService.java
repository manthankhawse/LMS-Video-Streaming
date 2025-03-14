package com.example.server.service;

import com.example.server.entities.Course;
import com.example.server.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService {
//    @Autowired
    private final CourseRepository courseRepository;

    public Course createCourse(Course course){
        try{
            Course savedCourse = courseRepository.save(course);
            return savedCourse;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public Course getCourseInfo(Long courseId){
        try{
            return courseRepository.findById(courseId)
                    .orElse(null);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
