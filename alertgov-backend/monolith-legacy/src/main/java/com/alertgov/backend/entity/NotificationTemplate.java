package com.alertgov.backend.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "AG_NOTIFICATION_TEMPLATES")
public class NotificationTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long templateId;


    public Long getTemplateId() { return this.templateId; }
    public void setTemplateId(Long templateId) { this.templateId = templateId; }
}
