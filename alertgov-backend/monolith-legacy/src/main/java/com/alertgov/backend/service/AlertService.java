package com.alertgov.backend.service;
import com.alertgov.backend.entity.Alert;
import com.alertgov.backend.repository.AlertRepository;
import com.alertgov.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlertService {
    @Autowired
    private AlertRepository alertRepository;

    public List<Alert> getAllAlerts() { return alertRepository.findAll(); }
    
    public Alert getAlertById(String id) {
        return alertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Alert not found: " + id));
    }
    
    public Alert createAlert(Alert alert) { return alertRepository.save(alert); }
}
