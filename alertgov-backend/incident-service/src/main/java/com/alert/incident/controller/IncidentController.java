package com.alert.incident.controller;

import com.alert.incident.entity.IncidentReport;
import com.alert.incident.repository.IncidentReportRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/incidents")
public class IncidentController {

    private final IncidentReportRepository repository;
    private final RestTemplate restTemplate;

    public IncidentController(IncidentReportRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    @PostMapping
    public ResponseEntity<IncidentReport> reportIncident(@RequestBody IncidentReport report) {
        report.setDate(LocalDateTime.now());
        if (report.getStatus() == null || report.getStatus().isEmpty()) {
            report.setStatus("Active");
        }
        
        IncidentReport saved = repository.save(report);
        
        // Asynchronously call AI Service
        new Thread(() -> {
            try {
                String aiUrl = "http://ai-service/api/v1/ai/predict/" + saved.getId();
                Map<String, String> payload = new HashMap<>();
                payload.put("description", saved.getDescription());
                ResponseEntity<Map> aiResponse = restTemplate.postForEntity(aiUrl, payload, Map.class);
                
                if (aiResponse.getBody() != null) {
                    Map<String, Object> body = aiResponse.getBody();
                    saved.setAiSummary(body.containsKey("predictedSeverity") ? "Severity: " + body.get("predictedSeverity") : "AI processed");
                    saved.setAiRecommendation((String) body.get("recommendations"));
                    repository.save(saved);
                }
            } catch (Exception e) {
                System.out.println("AI Service call failed: " + e.getMessage());
            }
        }).start();
        
        // Send Notification to Taluk
        sendNotification("taluk", "New Incident Reported", "Incident " + saved.getId() + " requires verification.");

        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<IncidentReport>> getAllIncidents() {
        return ResponseEntity.ok(repository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<IncidentReport> getIncident(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<IncidentReport> updateIncidentStatus(@PathVariable String id, @RequestBody java.util.Map<String, String> payload) {
        return repository.findById(id).map(incident -> {
            if (payload.containsKey("status")) {
                incident.setStatus(payload.get("status"));
            }
            if (payload.containsKey("level")) {
                incident.setLevel(payload.get("level"));
            }
            
            IncidentReport updated = repository.save(incident);
            
            // Send Notification based on status
            String targetUser = payload.getOrDefault("level", "district");
            sendNotification(targetUser, "Incident Status Updated", "Incident " + id + " status changed to " + updated.getStatus());
            
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        List<IncidentReport> all = repository.findAll();
        long total = all.size();
        long resolved = all.stream().filter(i -> "Resolved".equalsIgnoreCase(i.getStatus())).count();
        long active = total - resolved;
        long critical = all.stream().filter(i -> "Severe".equalsIgnoreCase(i.getSeverity()) || "Extremely Severe".equalsIgnoreCase(i.getSeverity())).count();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalIncidents", total);
        stats.put("activeIncidents", active);
        stats.put("resolvedIncidents", resolved);
        stats.put("criticalIncidents", critical);
        return ResponseEntity.ok(stats);
    }
    
    private void sendNotification(String userId, String title, String message) {
        new Thread(() -> {
            try {
                Map<String, String> notif = new HashMap<>();
                notif.put("userId", userId);
                notif.put("title", title);
                notif.put("message", message);
                notif.put("channel", "PUSH");
                restTemplate.postForEntity("http://notification-service/api/v1/notifications", notif, Map.class);
            } catch (Exception e) {
                System.out.println("Notification sending failed: " + e.getMessage());
            }
        }).start();
    }

    @DeleteMapping("/clear-all")
    public ResponseEntity<Void> clearAllIncidents() {
        repository.deleteAll();
        return ResponseEntity.ok().build();
    }
}
