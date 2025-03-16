package com.example.server.dto;

import com.example.server.dto.SectionDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDTO {
    private Long id;
    private String imageUrl;
    private String title;
    private String description;
    private Integer price;
    private Boolean published;
    private List<SectionDTO> sections;
}
