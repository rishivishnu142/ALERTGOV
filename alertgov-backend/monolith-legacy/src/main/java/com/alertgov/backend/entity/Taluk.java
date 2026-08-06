package com.alertgov.backend.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "AG_TALUKS")
public class Taluk {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long talukId;


    public Long getTalukId() { return this.talukId; }
    public void setTalukId(Long talukId) { this.talukId = talukId; }
}
