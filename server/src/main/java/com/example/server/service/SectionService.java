package com.example.server.service;

import com.example.server.entities.Section;
import com.example.server.repository.SectionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SectionService {
    private final SectionRepository sectionRepository;

    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    public List<Section> getSectionsByCourse(Long courseId) {
        return sectionRepository.findByCourseIdOrderByPosition(courseId);
    }

    @Transactional
    public Section createSection(Section section) {
        List<Section> existingSections = sectionRepository.findByCourseIdOrderByPosition(section.getCourse().getId());

        // Set position dynamically (append at the end)
        section.setPosition(existingSections.size() + 1);
        return sectionRepository.save(section);
    }

    @Transactional
    public void updateSectionPosition(Long sectionId, int newPosition) {
        Optional<Section> optionalSection = sectionRepository.findById(sectionId);

        if (optionalSection.isPresent()) {
            Section section = optionalSection.get();
            section.setPosition(newPosition);
            sectionRepository.save(section);
        }
    }

    @Transactional
    public void deleteSection(Long sectionId) {
        Optional<Section> optionalSection = sectionRepository.findById(sectionId);

        if (optionalSection.isPresent()) {
            Section sectionToDelete = optionalSection.get();
            Long courseId = sectionToDelete.getCourse().getId();
            int deletedPosition = sectionToDelete.getPosition();

            // Delete the section
            sectionRepository.deleteById(sectionId);

            // Fetch remaining sections and shift their positions
            List<Section> sections = sectionRepository.findByCourseIdOrderByPosition(courseId);
            for (Section section : sections) {
                if (section.getPosition() > deletedPosition) {
                    section.setPosition(section.getPosition() - 1);
                    sectionRepository.save(section);
                }
            }
        }
    }

    public Section getSectionById(Long sectionId) {
        return sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Course content not found"));
    }
}
