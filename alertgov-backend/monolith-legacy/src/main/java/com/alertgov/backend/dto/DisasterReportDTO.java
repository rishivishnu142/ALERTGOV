package com.alertgov.backend.dto;
public class DisasterReportDTO {
    private String reportId;
    private String reporterId;
    private Long disasterTypeId;
    private String description;
    private String latitude;
    private String longitude;
    private Long villageId;
    private String status;

    public String getReportId() { return this.reportId; }
    public void setReportId(String reportId) { this.reportId = reportId; }
    public String getReporterId() { return this.reporterId; }
    public void setReporterId(String reporterId) { this.reporterId = reporterId; }
    public Long getDisasterTypeId() { return this.disasterTypeId; }
    public void setDisasterTypeId(Long disasterTypeId) { this.disasterTypeId = disasterTypeId; }
    public String getDescription() { return this.description; }
    public void setDescription(String description) { this.description = description; }
    public String getLatitude() { return this.latitude; }
    public void setLatitude(String latitude) { this.latitude = latitude; }
    public String getLongitude() { return this.longitude; }
    public void setLongitude(String longitude) { this.longitude = longitude; }
    public Long getVillageId() { return this.villageId; }
    public void setVillageId(Long villageId) { this.villageId = villageId; }
    public String getStatus() { return this.status; }
    public void setStatus(String status) { this.status = status; }
}
