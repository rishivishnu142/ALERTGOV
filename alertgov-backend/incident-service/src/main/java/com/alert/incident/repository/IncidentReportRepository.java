package com.alert.incident.repository;

import com.alert.incident.entity.IncidentReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface IncidentReportRepository extends MongoRepository<IncidentReport, String> {
    List<IncidentReport> findByDistrict(String district);
    List<IncidentReport> findByStatus(String status);
}
