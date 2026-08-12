package com.alert.incident.repository.jpa;

import com.alert.incident.entity.IncidentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentReportRepository extends JpaRepository<IncidentReport, String> {
    List<IncidentReport> findByDistrict(String district);
    List<IncidentReport> findByTaluk(String taluk);
    List<IncidentReport> findByStatus(String status);
}
