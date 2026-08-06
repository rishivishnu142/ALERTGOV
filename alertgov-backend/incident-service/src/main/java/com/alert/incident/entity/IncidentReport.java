package com.alert.incident.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "incidents")
public class IncidentReport {
    
    @Id
    private String id;
    private String title;
    private String category;
    private String severity;
    private String status; // Active, Waiting for Collector, Resolved
    private String level;
    
    private String district;
    private String taluk;
    private String village;
    
    private String description;
    private String reportedBy;
    private LocalDateTime date;
    
    private List<String> mediaIds = new ArrayList<>();
    private List<String> updates = new ArrayList<>();

    public IncidentReport() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    
    public String getTaluk() { return taluk; }
    public void setTaluk(String taluk) { this.taluk = taluk; }
    
    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getReportedBy() { return reportedBy; }
    public void setReportedBy(String reportedBy) { this.reportedBy = reportedBy; }
    
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    
    public List<String> getMediaIds() { return mediaIds; }
    public void setMediaIds(List<String> mediaIds) { this.mediaIds = mediaIds; }
    
    public List<String> getUpdates() { return updates; }
    public void setUpdates(List<String> updates) { this.updates = updates; }
}
