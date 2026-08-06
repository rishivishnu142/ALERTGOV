package com.alertgov.backend.repository;

import com.alertgov.backend.entity.DisasterReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisasterReportRepository extends JpaRepository<DisasterReport, String> {
}
