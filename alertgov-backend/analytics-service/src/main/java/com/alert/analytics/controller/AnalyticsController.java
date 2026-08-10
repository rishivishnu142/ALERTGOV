package com.alert.analytics.controller;

import com.alert.analytics.entity.AnalyticsSnapshot;
import com.alert.analytics.repository.AnalyticsSnapshotRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {

    private final AnalyticsSnapshotRepository repository;
    private final RestTemplate restTemplate;

    public AnalyticsController(AnalyticsSnapshotRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map> getDashboardData() {
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity("http://incident-service/api/v1/incidents/stats", Map.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    @PostMapping("/snapshot")
    public ResponseEntity<AnalyticsSnapshot> generateSnapshot(@RequestBody AnalyticsSnapshot snapshot) {
        snapshot.setSnapshotDate(LocalDate.now());
        return ResponseEntity.ok(repository.save(snapshot));
    }
}
