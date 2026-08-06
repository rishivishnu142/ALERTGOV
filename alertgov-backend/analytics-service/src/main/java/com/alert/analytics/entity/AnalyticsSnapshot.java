package com.alert.analytics.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "analytics_snapshots")
public class AnalyticsSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String snapshotId;

    private LocalDate snapshotDate;
    private int totalActiveIncidents;
    private int totalAlertsSent;
    private int totalPendingApprovals;
    private String topAffectedDistrict;

    public AnalyticsSnapshot() {}

    public String getSnapshotId() { return snapshotId; }
    public void setSnapshotId(String snapshotId) { this.snapshotId = snapshotId; }
    
    public LocalDate getSnapshotDate() { return snapshotDate; }
    public void setSnapshotDate(LocalDate snapshotDate) { this.snapshotDate = snapshotDate; }
    
    public int getTotalActiveIncidents() { return totalActiveIncidents; }
    public void setTotalActiveIncidents(int totalActiveIncidents) { this.totalActiveIncidents = totalActiveIncidents; }
    
    public int getTotalAlertsSent() { return totalAlertsSent; }
    public void setTotalAlertsSent(int totalAlertsSent) { this.totalAlertsSent = totalAlertsSent; }
    
    public int getTotalPendingApprovals() { return totalPendingApprovals; }
    public void setTotalPendingApprovals(int totalPendingApprovals) { this.totalPendingApprovals = totalPendingApprovals; }
    
    public String getTopAffectedDistrict() { return topAffectedDistrict; }
    public void setTopAffectedDistrict(String topAffectedDistrict) { this.topAffectedDistrict = topAffectedDistrict; }
}
