package com.alertgov.backend.repository;

import com.alertgov.backend.entity.ReportStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportStatusHistoryRepository extends JpaRepository<ReportStatusHistory, Long> {
}
