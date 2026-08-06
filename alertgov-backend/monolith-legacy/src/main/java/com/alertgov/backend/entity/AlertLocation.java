package com.alertgov.backend.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "AG_ALERT_LOCATIONS")
public class AlertLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long alId;


    public Long getAlId() { return this.alId; }
    public void setAlId(Long alId) { this.alId = alId; }
}
