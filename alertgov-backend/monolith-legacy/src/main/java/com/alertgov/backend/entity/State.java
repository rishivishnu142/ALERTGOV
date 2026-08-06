package com.alertgov.backend.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "AG_STATES")
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long stateId;


    public Long getStateId() { return this.stateId; }
    public void setStateId(Long stateId) { this.stateId = stateId; }
}
