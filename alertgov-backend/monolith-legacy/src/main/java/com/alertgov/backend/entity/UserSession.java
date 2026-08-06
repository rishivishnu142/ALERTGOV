package com.alertgov.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "AG_USER_SESSIONS")
public class UserSession {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long sessionId;


    public Long getSessionId() { return this.sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
}
