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
        private String id;
        private String username; // keeping for backward compatibility if needed, but id is required
        private String role;
        private String name;
        private String district;
        private String taluk;
        private String village;

        public UserDetails() {}

        public UserDetails(String username, String role, String name, String district, String taluk, String village) {
            this.id = username;
            this.username = username;
            this.role = role;
            this.name = name;
            this.district = district;
            this.taluk = taluk;
            this.village = village;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDistrict() { return district; }
        public void setDistrict(String district) { this.district = district; }

        public String getTaluk() { return taluk; }
        public void setTaluk(String taluk) { this.taluk = taluk; }

        public String getVillage() { return village; }
        public void setVillage(String village) { this.village = village; }
    }
}
