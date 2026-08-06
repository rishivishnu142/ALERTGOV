package com.alert.user.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    private String username; // Corresponds to AuthUser's username
    
    private String name;
    private String title;
    private String role;
    
    // Location Hierarchy
    private String state;
    private String district;
    private String taluk;
    private String village;

    public Employee() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getTaluk() { return taluk; }
    public void setTaluk(String taluk) { this.taluk = taluk; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }
}
