package com.alert.approval.repository;

import com.alert.approval.entity.ApprovalWorkflow;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApprovalWorkflowRepository extends JpaRepository<ApprovalWorkflow, String> {
    List<ApprovalWorkflow> findByAssignedCollectorId(String collectorId);
    List<ApprovalWorkflow> findByStatus(String status);
}
