package com.alert.ai.repository;

import com.alert.ai.entity.AiPrediction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiPredictionRepository extends JpaRepository<AiPrediction, String> {
    AiPrediction findByIncidentId(String incidentId);
}
