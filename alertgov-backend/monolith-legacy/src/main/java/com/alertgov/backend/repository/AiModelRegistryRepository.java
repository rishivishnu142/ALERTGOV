package com.alertgov.backend.repository;

import com.alertgov.backend.entity.AiModelRegistry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiModelRegistryRepository extends JpaRepository<AiModelRegistry, Long> {
}
