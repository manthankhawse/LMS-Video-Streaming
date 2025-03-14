package com.example.server.request.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class AuthenticationRequest {
    private String username;
    private String password;
}