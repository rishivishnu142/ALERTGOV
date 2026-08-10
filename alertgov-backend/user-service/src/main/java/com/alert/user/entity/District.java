package com.alert.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "districts")
public class District {

    @Id
    private String name;
    
    @jakarta.persistence.Column(length = 4000)
    private String taluksJson;

    public District() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTaluksJson() {
        return taluksJson;
    }

    public void setTaluksJson(String taluksJson) {
        this.taluksJson = taluksJson;
    }
}
