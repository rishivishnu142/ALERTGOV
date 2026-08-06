package com.alertgov.backend.dto;
import java.time.LocalDateTime;
public class AlertDTO {
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

    public String getAlertId() { return this.alertId; }
    public void setAlertId(String alertId) { this.alertId = alertId; }
    public String getSenderId() { return this.senderId; }
    public void setSenderId(String senderId) { this.senderId = senderId; }
    public Long getDisasterTypeId() { return this.disasterTypeId; }
    public void setDisasterTypeId(Long disasterTypeId) { this.disasterTypeId = disasterTypeId; }
    public String getTitle() { return this.title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return this.description; }
    public void setDescription(String description) { this.description = description; }
    public String getSeverity() { return this.severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getStatus() { return this.status; }
    public void setStatus(String status) { this.status = status; }
    public String getTargetLocationType() { return this.targetLocationType; }
    public void setTargetLocationType(String targetLocationType) { this.targetLocationType = targetLocationType; }
    public Long getTargetLocationId() { return this.targetLocationId; }
    public void setTargetLocationId(Long targetLocationId) { this.targetLocationId = targetLocationId; }
    public LocalDateTime getValidUntil() { return this.validUntil; }
    public void setValidUntil(LocalDateTime validUntil) { this.validUntil = validUntil; }
}
