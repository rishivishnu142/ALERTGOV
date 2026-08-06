package com.alert.analytics.repository;

import com.alert.analytics.entity.AnalyticsSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface AnalyticsSnapshotRepository extends JpaRepository<AnalyticsSnapshot, String> {
    Optional<AnalyticsSnapshot> findBySnapshotDate(LocalDate date);
}
