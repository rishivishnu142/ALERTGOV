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
    public ResponseEntity<Map<String, Object>> getWeatherAdvisory() {
        try {
            // Fetch live weather from Open-Meteo for Tamil Nadu (Chennai)
            String url = "https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current=temperature_2m,precipitation,wind_speed_10m";
            ResponseEntity<Map> weatherRes = restTemplate.getForEntity(url, Map.class);
            Map<String, Object> body = weatherRes.getBody();
            Map<String, Object> current = (Map<String, Object>) body.get("current");
            
            double precip = current != null && current.get("precipitation") != null ? ((Number) current.get("precipitation")).doubleValue() : 0.0;
            double wind = current != null && current.get("wind_speed_10m") != null ? ((Number) current.get("wind_speed_10m")).doubleValue() : 0.0;
            double temp = current != null && current.get("temperature_2m") != null ? ((Number) current.get("temperature_2m")).doubleValue() : 0.0;
            
            String summary = "Live Weather (TN): Temp " + temp + "°C, Rain " + precip + "mm, Wind " + wind + "km/h.";
            String warningType = "Normal / No Alert";
            String recommendation = "No immediate action required. Conditions are normal.";
            int confidence = 96;
            
            if (precip > 10.0) {
                warningType = "Heavy Rain / Red Alert";
                recommendation = "Alert coastal districts and low-lying areas immediately.";
            } else if (wind > 40.0) {
                warningType = "High Winds / Cyclone Alert";
                recommendation = "Issue warning for fishermen. Secure loose infrastructure.";
            } else if (temp > 40.0) {
                warningType = "Heat Wave / Orange Alert";
                recommendation = "Issue heat wave advisory to all districts.";
            }
            
            Map<String, Object> data = Map.of(
                "summary", summary,
                "recommendation", recommendation,
                "confidence", confidence,
                "targetDistrict", "Tamil Nadu (Statewide)",
                "warningType", warningType,
                "advisoryMessage", "Based on LIVE meteorological data, current conditions: " + summary
            );
            
            return ResponseEntity.ok(Map.of("data", data));
        } catch (Exception e) {
            throw new RuntimeException("Live Weather API failed: " + e.getMessage());
        }
    }
    
    public ResponseEntity<Map<String, Object>> weatherAdvisoryFallback(Exception e) {
        System.out.println("Circuit Breaker triggered: Returning fallback advisory.");
        Map<String, Object> data = Map.of(
        		"summary", "Partly cloudy with thunderstorms and rain possible in some areas today.",
        		"recommendation", "Stay alert for heavy rain, thunderstorms and lightning.",
        		"confidence", 85,
        		"targetDistrict", "Tamil Nadu",
        		"warningType", "Heavy Rain",
        		"advisoryMessage", "Heavy rainfall with thunderstorms and lightning is possible over Tamil Nadu today, August 14, 2026."
        );
        return ResponseEntity.ok(Map.of("data", data));
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
