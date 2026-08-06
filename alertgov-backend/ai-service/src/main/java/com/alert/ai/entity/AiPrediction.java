package com.alert.ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_predictions")
public class AiPrediction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String predictionId;

    private String incidentId;
    private String predictedSeverity;
    private String spreadRadiusKm;
    private String recommendations;
    
    private LocalDateTime generatedAt;

    public AiPrediction() {}

    public String getPredictionId() { return predictionId; }
    public void setPredictionId(String predictionId) { this.predictionId = predictionId; }
    
    public String getIncidentId() { return incidentId; }
    public void setIncidentId(String incidentId) { this.incidentId = incidentId; }
    
    public String getPredictedSeverity() { return predictedSeverity; }
    public void setPredictedSeverity(String predictedSeverity) { this.predictedSeverity = predictedSeverity; }
    
    public String getSpreadRadiusKm() { return spreadRadiusKm; }
    public void setSpreadRadiusKm(String spreadRadiusKm) { this.spreadRadiusKm = spreadRadiusKm; }
    
    public String getRecommendations() { return recommendations; }
    public void setRecommendations(String recommendations) { this.recommendations = recommendations; }
    
    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }

    @PrePersist
    protected void onCreate() {
        generatedAt = LocalDateTime.now();
    }
}
