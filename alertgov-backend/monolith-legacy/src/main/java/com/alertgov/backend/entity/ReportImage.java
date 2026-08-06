package com.alertgov.backend.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "AG_REPORT_IMAGES")
public class ReportImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String imageId;


    public String getImageId() { return this.imageId; }
    public void setImageId(String imageId) { this.imageId = imageId; }
}
