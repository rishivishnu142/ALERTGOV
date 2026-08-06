package com.alert.auth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "auth_users")
public class AuthUser {
    @Id
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String role;

    public AuthUser() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
