package com.alert.ai.controller;

import com.alert.ai.entity.AiPrediction;
import com.alert.ai.repository.AiPredictionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {

    private final AiPredictionRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${PYTHON_AI_SERVICE_URL:http://localhost:8000}")
    private String pythonAiServiceUrl;

    public AiController(AiPredictionRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/predict/{incidentId}")
    public ResponseEntity<AiPrediction> generatePrediction(@PathVariable String incidentId, @RequestBody(required = false) Map<String, String> payload) {
        String prompt = "Incident ID " + incidentId;
        if (payload != null && payload.containsKey("description")) {
            prompt = payload.get("description");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        String requestJson = "{\"prompt\": \"" + prompt.replace("\"", "\\\"") + "\"}";
        HttpEntity<String> request = new HttpEntity<>(requestJson, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(pythonAiServiceUrl + "/ai/predict-risk", request, Map.class);
            Map<String, Object> body = response.getBody();
            Map<String, Object> data = (Map<String, Object>) body.get("data");

            AiPrediction prediction = new AiPrediction();
            prediction.setIncidentId(incidentId);
            
            if (data != null) {
                prediction.setPredictedSeverity((String) data.get("severity"));
                prediction.setRecommendations((String) data.get("recommendation"));
                prediction.setSpreadRadiusKm("Unknown"); // The prompt doesn't return this yet
            } else {
                prediction.setPredictedSeverity("UNKNOWN");
                prediction.setRecommendations((String) body.get("response"));
                prediction.setSpreadRadiusKm("Unknown");
            }
            
            return ResponseEntity.ok(repository.save(prediction));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker(name = "weatherService", fallbackMethod = "weatherAdvisoryFallback")
    @GetMapping("/weather-advisory")
    public ResponseEntity<Map> getWeatherAdvisory() {
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(pythonAiServiceUrl + "/ai/weather-advisory", Map.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            // Throw exception so CircuitBreaker catches it if restTemplate fails
            throw new RuntimeException("AI Weather Service failed: " + e.getMessage());
        }
    }
    
    public ResponseEntity<Map> weatherAdvisoryFallback(Exception e) {
        System.out.println("Circuit Breaker triggered: Returning simulated fallback advisory.");
        Map<String, String> fallbackData = Map.of(
            "draft", "High wind speeds and precipitation detected. Automated advisory generated due to AI service timeout. Please take precautions.",
            "severity", "HIGH"
        );
        return ResponseEntity.ok(fallbackData);
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
