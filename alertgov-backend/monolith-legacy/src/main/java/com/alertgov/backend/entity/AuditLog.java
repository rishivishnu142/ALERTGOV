package com.alertgov.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "AG_AUDIT_LOGS")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long logId;


    public Long getLogId() { return this.logId; }
    public void setLogId(Long logId) { this.logId = logId; }
}
