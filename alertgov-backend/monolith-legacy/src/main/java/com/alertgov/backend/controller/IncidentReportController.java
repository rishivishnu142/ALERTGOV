package com.alertgov.backend.controller;

import com.alertgov.backend.entity.IncidentReport;
import com.alertgov.backend.repository.IncidentReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/incidents")

public class IncidentReportController {

    @Autowired
    private IncidentReportRepository repository;

    @GetMapping
    public List<IncidentReport> getAllIncidents() {
        return repository.findAll();
    }
    
    @GetMapping("/taluk/{talukName}")
    public List<IncidentReport> getIncidentsByTaluk(@PathVariable String talukName) {
        return repository.findByTaluk(talukName);
    }

    @PostMapping
    public ResponseEntity<IncidentReport> createIncident(@RequestBody IncidentReport incident) {
        // Automatically set date if missing
        if (incident.getDate() == null) {
            incident.setDate(java.time.Instant.now().toString());
        }
        // If ID starts with INC-, we can use it, else let MongoDB generate one
        if (incident.getId() == null || incident.getId().isEmpty()) {
            incident.setId("INC-" + System.currentTimeMillis());
        }
        IncidentReport saved = repository.save(incident);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<IncidentReport> updateStatus(@PathVariable String id, @RequestBody java.util.Map<String, String> payload) {
        Optional<IncidentReport> existing = repository.findById(id);
        if (existing.isPresent()) {
            IncidentReport incident = existing.get();
            incident.setStatus(payload.get("status"));
            incident.setLevel(payload.get("level") != null ? payload.get("level") : incident.getLevel());
            return ResponseEntity.ok(repository.save(incident));
        }
        return ResponseEntity.notFound().build();
    }
}
