package com.example.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Expose "uploads/" folder as a static resource
        registry.addResourceHandler("/uploads/**") // URL pattern
                .addResourceLocations("file:/app/uploads/"); // Absolute path in container

        // Expose "videos_hls/" folder as a static resource
        registry.addResourceHandler("/api/v1/course-content/stream/app/videos_hls/**")
                .addResourceLocations("file:/app/videos_hls/");  // Adjust the path to your actual video directory
    }
}
