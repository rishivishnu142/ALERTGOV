package com.alertgov.backend.service;
import com.alertgov.backend.entity.Notification;
import com.alertgov.backend.repository.NotificationRepository;
import com.alertgov.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getAllNotifications() { return notificationRepository.findAll(); }
    
    public Notification createNotification(Notification notification) { return notificationRepository.save(notification); }
}
