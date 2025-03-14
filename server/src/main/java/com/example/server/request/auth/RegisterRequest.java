package com.example.server.request.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    private String name;
    private String username;
    private String email;
    private String password;
    private Integer role;
}