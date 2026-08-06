package com.alert.auth.dto;

public class AuthResponse {
    private boolean success;
    private String token;
    private String message;
    private UserDetails user;

    public AuthResponse() {}

    public AuthResponse(boolean success, String token, String message, UserDetails user) {
        this.success = success;
        this.token = token;
        this.message = message;
        this.user = user;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public UserDetails getUser() { return user; }
    public void setUser(UserDetails user) { this.user = user; }

    public static class UserDetails {
        private String username;
        private String role;

        public UserDetails() {}

        public UserDetails(String username, String role) {
            this.username = username;
            this.role = role;
        }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
}
