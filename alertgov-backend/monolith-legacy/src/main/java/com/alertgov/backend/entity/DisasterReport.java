package com.alertgov.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "AG_DISASTER_REPORTS")
public class DisasterReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String reportId;

    private String reporterId;
    private Long disasterTypeId;
    private String description;
    private String latitude;
    private String longitude;
    private Long villageId;
    private String status;

    public DisasterReport() {}

    public String getReportId() { return reportId; }
    public void setReportId(String reportId) { this.reportId = reportId; }

    public String getReporterId() { return reporterId; }
    public void setReporterId(String reporterId) { this.reporterId = reporterId; }

    public Long getDisasterTypeId() { return disasterTypeId; }
    public void setDisasterTypeId(Long disasterTypeId) { this.disasterTypeId = disasterTypeId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLatitude() { return latitude; }
    public void setLatitude(String latitude) { this.latitude = latitude; }

    public String getLongitude() { return longitude; }
    public void setLongitude(String longitude) { this.longitude = longitude; }

    public Long getVillageId() { return villageId; }
    public void setVillageId(Long villageId) { this.villageId = villageId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
