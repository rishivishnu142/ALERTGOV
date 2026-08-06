package com.alert.approval.controller;

import com.alert.approval.entity.ApprovalWorkflow;
import com.alert.approval.repository.ApprovalWorkflowRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/approvals")
public class ApprovalController {

    private final ApprovalWorkflowRepository repository;

    public ApprovalController(ApprovalWorkflowRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ApprovalWorkflow> createApproval(@RequestBody ApprovalWorkflow approval) {
        approval.setStatus("PENDING");
        return ResponseEntity.ok(repository.save(approval));
    }

    @GetMapping("/collector/{collectorId}")
    public ResponseEntity<List<ApprovalWorkflow>> getApprovalsForCollector(@PathVariable String collectorId) {
        return ResponseEntity.ok(repository.findByAssignedCollectorId(collectorId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApprovalWorkflow> updateApprovalStatus(@PathVariable String id, @RequestBody ApprovalWorkflow update) {
        return repository.findById(id).map(existing -> {
            existing.setStatus(update.getStatus());
            existing.setComments(update.getComments());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }
}
