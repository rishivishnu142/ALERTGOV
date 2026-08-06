package com.alertgov.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "AG_AI_MODEL_REGISTRYS")
public class AiModelRegistry {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long modelId;


    public Long getModelId() { return this.modelId; }
    public void setModelId(Long modelId) { this.modelId = modelId; }
}
