package com.alertgov.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "AG_REPORT_STATUS_HISTORYS")
public class ReportStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long historyId;


    public Long getHistoryId() { return this.historyId; }
    public void setHistoryId(Long historyId) { this.historyId = historyId; }
}
