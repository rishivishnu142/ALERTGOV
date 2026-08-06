package com.alert.analytics.controller;

import com.alert.analytics.entity.AnalyticsSnapshot;
import com.alert.analytics.repository.AnalyticsSnapshotRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {

    private final AnalyticsSnapshotRepository repository;

    public AnalyticsController(AnalyticsSnapshotRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<List<AnalyticsSnapshot>> getDashboardData() {
        return ResponseEntity.ok(repository.findAll());
    }
    
    @PostMapping("/snapshot")
    public ResponseEntity<AnalyticsSnapshot> generateSnapshot(@RequestBody AnalyticsSnapshot snapshot) {
        snapshot.setSnapshotDate(LocalDate.now());
        return ResponseEntity.ok(repository.save(snapshot));
    }
}
