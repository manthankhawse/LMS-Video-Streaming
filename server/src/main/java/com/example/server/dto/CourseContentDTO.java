package com.example.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseContentDTO {
    private Long id;
    private String title;
    private String videoUrl;
    private Integer position;
    private String pdfUrl;
}