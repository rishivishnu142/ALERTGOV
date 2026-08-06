package com.alertgov.backend.dto;
public class NotificationDTO {
    private Long notificationId;
    private String userId;
    private String alertId;
    private String title;
    private String message;
    private String status;
    private String channel;

    public Long getNotificationId() { return this.notificationId; }
    public void setNotificationId(Long notificationId) { this.notificationId = notificationId; }
    public String getUserId() { return this.userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getAlertId() { return this.alertId; }
    public void setAlertId(String alertId) { this.alertId = alertId; }
    public String getTitle() { return this.title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return this.message; }
    public void setMessage(String message) { this.message = message; }
    public String getStatus() { return this.status; }
    public void setStatus(String status) { this.status = status; }
    public String getChannel() { return this.channel; }
    public void setChannel(String channel) { this.channel = channel; }
}
