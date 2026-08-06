package com.alertgov.backend.repository;

import com.alertgov.backend.entity.IncidentReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentReportRepository extends MongoRepository<IncidentReport, String> {
    List<IncidentReport> findByTaluk(String taluk);
    List<IncidentReport> findByDistrict(String district);
    List<IncidentReport> findByStatus(String status);
}
