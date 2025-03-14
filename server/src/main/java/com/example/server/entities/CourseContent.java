package com.example.server.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Table(name = "course_content")
@Getter
@Setter
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "section_id", nullable = false)
    private Section section;

    @Column(nullable = false)
    private String title;

    private String videoUrl;

    @Column(nullable = false)
    private Integer position;

    private String pdfUrl;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
