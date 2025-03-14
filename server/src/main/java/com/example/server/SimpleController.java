package com.example.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class SimpleController {

    @GetMapping("/")
    public Map<String, String> home() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to the application!");
        response.put("status", "running");
        return response;
    }

    @GetMapping("/newTest")
    public Map<String, String> newTest(){
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a new controller");
        response.put("status", "running");
        return response;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Spring Boot Application");
        return response;
    }

    @GetMapping("/test")
    public Map<String, String> test(@RequestParam(defaultValue = "Guest") String name) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello, " + name + "! The app is working.");
        return response;
    }
}
