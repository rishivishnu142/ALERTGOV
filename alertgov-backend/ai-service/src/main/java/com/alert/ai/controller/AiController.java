package com.alert.ai.controller;

import com.alert.ai.entity.AiPrediction;
import com.alert.ai.repository.AiPredictionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {

    private final AiPredictionRepository repository;

    public AiController(AiPredictionRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/predict/{incidentId}")
    public ResponseEntity<AiPrediction> generatePrediction(@PathVariable String incidentId) {
        // MOCK AI LOGIC (To be replaced with actual ML/Gemini call in Phase 7)
        AiPrediction prediction = new AiPrediction();
        prediction.setIncidentId(incidentId);
        prediction.setPredictedSeverity("HIGH");
        prediction.setSpreadRadiusKm("15.5");
        prediction.setRecommendations("Evacuate low-lying areas immediately. Dispatch SDRF teams.");
        
        return ResponseEntity.ok(repository.save(prediction));
    }
    
    @GetMapping("/prediction/{incidentId}")
    public ResponseEntity<AiPrediction> getPrediction(@PathVariable String incidentId) {
        AiPrediction prediction = repository.findByIncidentId(incidentId);
        if (prediction != null) {
            return ResponseEntity.ok(prediction);
        }
        return ResponseEntity.notFound().build();
    }
}
