package com.alertgov.backend.repository;

import com.alertgov.backend.entity.DisasterType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisasterTypeRepository extends JpaRepository<DisasterType, Long> {
}
