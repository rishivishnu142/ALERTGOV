package com.alertgov.backend.controller;
import com.alertgov.backend.entity.DisasterReport;
import com.alertgov.backend.service.DisasterReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")

public class DisasterReportController {
    
    @Autowired
    private DisasterReportService reportService;

    @GetMapping
    public List<DisasterReport> getAllReports() { return reportService.getAllReports(); }

    @GetMapping("/{id}")
    public ResponseEntity<DisasterReport> getReportById(@PathVariable String id) {
        return ResponseEntity.ok(reportService.getReportById(id));
    }

    @PostMapping
    public ResponseEntity<DisasterReport> createReport(@RequestBody DisasterReport report) {
        return new ResponseEntity<>(reportService.createReport(report), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<DisasterReport> updateStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(reportService.updateReportStatus(id, status));
    }
}
