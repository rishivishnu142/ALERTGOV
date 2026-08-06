package com.alertgov.backend.service;
import com.alertgov.backend.entity.DisasterReport;
import com.alertgov.backend.repository.DisasterReportRepository;
import com.alertgov.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DisasterReportService {
    @Autowired
    private DisasterReportRepository reportRepository;

    public List<DisasterReport> getAllReports() { return reportRepository.findAll(); }
    
    public DisasterReport getReportById(String id) {
        return reportRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Report not found: " + id));
    }
    
    public DisasterReport createReport(DisasterReport report) { return reportRepository.save(report); }
    
    public DisasterReport updateReportStatus(String id, String status) {
        DisasterReport report = getReportById(id);
        report.setStatus(status);
        return reportRepository.save(report);
    }
}
