package com.alertgov.backend.controller;
import com.alertgov.backend.entity.Alert;
import com.alertgov.backend.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/alerts")

public class AlertController {
    
    @Autowired
    private AlertService alertService;

    @GetMapping
    public List<Alert> getAllAlerts() { return alertService.getAllAlerts(); }

    @GetMapping("/{id}")
    public ResponseEntity<Alert> getAlertById(@PathVariable String id) {
        return ResponseEntity.ok(alertService.getAlertById(id));
    }

    @PostMapping
    public ResponseEntity<Alert> createAlert(@RequestBody Alert alert) {
        return new ResponseEntity<>(alertService.createAlert(alert), HttpStatus.CREATED);
    }
}
