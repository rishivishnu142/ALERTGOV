package com.alertgov.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "AG_ALERTS")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String alertId;

    private String senderId;
    private Long disasterTypeId;
    private String title;
    private String description;
    private String severity;
    private String status;
    private String targetLocationType;
    private Long targetLocationId;
    private LocalDateTime validUntil;

    public Alert() {}

    public String getAlertId() { return alertId; }
    public void setAlertId(String alertId) { this.alertId = alertId; }

    public String getSenderId() { return senderId; }
    public void setSenderId(String senderId) { this.senderId = senderId; }

    public Long getDisasterTypeId() { return disasterTypeId; }
    public void setDisasterTypeId(Long disasterTypeId) { this.disasterTypeId = disasterTypeId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTargetLocationType() { return targetLocationType; }
    public void setTargetLocationType(String targetLocationType) { this.targetLocationType = targetLocationType; }

    public Long getTargetLocationId() { return targetLocationId; }
    public void setTargetLocationId(Long targetLocationId) { this.targetLocationId = targetLocationId; }

    public LocalDateTime getValidUntil() { return validUntil; }
    public void setValidUntil(LocalDateTime validUntil) { this.validUntil = validUntil; }
}
