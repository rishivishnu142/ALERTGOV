package com.alertgov.backend.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "AG_DISASTER_TYPES")
public class DisasterType {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long disasterTypeId;


    public Long getDisasterTypeId() { return this.disasterTypeId; }
    public void setDisasterTypeId(Long disasterTypeId) { this.disasterTypeId = disasterTypeId; }
}
