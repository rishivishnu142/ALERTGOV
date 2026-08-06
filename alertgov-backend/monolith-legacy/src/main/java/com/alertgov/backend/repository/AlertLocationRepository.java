package com.alertgov.backend.repository;

import com.alertgov.backend.entity.AlertLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertLocationRepository extends JpaRepository<AlertLocation, Long> {
}
