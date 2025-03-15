package com.example.server.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class VideoService {

    @Value("${file.video.hls}")
    String HLS_DIR;

    // PostConstruct method to create the directory if not present
    @PostConstruct
    public void init() {
        System.out.println("This ran");
        try {
            Path hlsDirectoryPath = Paths.get(HLS_DIR);
            if (Files.notExists(hlsDirectoryPath)) {
                Files.createDirectories(hlsDirectoryPath); // Creates the directory if it doesn't exist
                System.out.println("HLS directory created at: " + HLS_DIR);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to create HLS directory", e);
        }
    }

    public String processVideo(MultipartFile file) {
        try {
            System.out.println("Processing start");
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            String videoId = UUID.randomUUID().toString() + "_" + filename.substring(0, filename.lastIndexOf("."));
            System.out.println("metadata created");
            // Process video directly from InputStream
            return processVideoWithFFmpeg(videoId, file.getInputStream());

        } catch (IOException e) {
            throw new RuntimeException("Error processing video", e);
        }
    }

    private String processVideoWithFFmpeg(String videoId, InputStream inputStream) {
        try {
            Path outputPath = Paths.get(HLS_DIR, videoId);
            Files.createDirectories(outputPath);

            ProcessBuilder processBuilder = new ProcessBuilder(
                    "ffmpeg",
                    "-i", "pipe:0",  // Read from stdin
                    "-c:v", "libx264",
                    "-c:a", "aac",
                    "-strict", "-2",
                    "-f", "hls",
                    "-hls_time", "10",
                    "-hls_list_size", "0",
                    "-hls_segment_filename", outputPath + "/segment_%3d.ts",
                    outputPath + "/master.m3u8"
            );

            Process process = processBuilder.start();

            // Write input stream to FFmpeg process
            try (var outputStream = process.getOutputStream()) {
                inputStream.transferTo(outputStream);
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("FFmpeg processing failed!");
            }

            System.out.println(outputPath.toString() + " final path");

            return outputPath.toString(); // Return path where HLS output is saved

        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Video processing failed", e);
        }
    }
}
