package com.example.server.dto;


import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SectionDTO {
    private Long id;
    private String title;
    private Integer position;
    private List<CourseContentDTO> contents;
}
