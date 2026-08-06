package com.alert.incident.controller;

import com.alert.incident.entity.IncidentReport;
import com.alert.incident.repository.IncidentReportRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/incidents")
public class IncidentController {

    private final IncidentReportRepository repository;

    public IncidentController(IncidentReportRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<IncidentReport> reportIncident(@RequestBody IncidentReport report) {
        report.setDate(LocalDateTime.now());
        report.setStatus("Active");
        return ResponseEntity.ok(repository.save(report));
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
}
