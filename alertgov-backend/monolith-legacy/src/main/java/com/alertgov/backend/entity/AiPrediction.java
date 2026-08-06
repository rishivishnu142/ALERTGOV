package com.alertgov.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "AG_AI_PREDICTIONS")
public class AiPrediction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String predictionId;


    public String getPredictionId() { return this.predictionId; }
    public void setPredictionId(String predictionId) { this.predictionId = predictionId; }
}
