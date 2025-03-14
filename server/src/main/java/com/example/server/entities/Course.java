package com.example.server.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;

@Table (name="courses")
@Getter
@Setter
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="instructor_id", nullable = false)
    private User instructor;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean published;
}
