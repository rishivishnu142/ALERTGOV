package com.alertgov.backend.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "AG_VILLAGES")
public class Village {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long villageId;


    public Long getVillageId() { return this.villageId; }
    public void setVillageId(Long villageId) { this.villageId = villageId; }
}
