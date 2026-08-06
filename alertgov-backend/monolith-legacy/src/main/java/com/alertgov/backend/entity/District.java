package com.alertgov.backend.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "AG_DISTRICTS")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long districtId;


    public Long getDistrictId() { return this.districtId; }
    public void setDistrictId(Long districtId) { this.districtId = districtId; }
}
