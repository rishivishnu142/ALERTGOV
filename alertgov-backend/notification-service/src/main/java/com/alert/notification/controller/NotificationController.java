package com.alert.notification.controller;

import com.alert.notification.entity.Notification;
import com.alert.notification.repository.NotificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationRepository repository;

    public NotificationController(NotificationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Notification> sendNotification(@RequestBody Notification notification) {
        notification.setStatus("UNREAD");
        return ResponseEntity.ok(repository.save(notification));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable String userId) {
        return ResponseEntity.ok(repository.findByUserIdOrderByCreatedAtDesc(userId));
    }
    
    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable String id) {
        return repository.findById(id).map(notif -> {
            notif.setStatus("READ");
            return ResponseEntity.ok(repository.save(notif));
        }).orElse(ResponseEntity.notFound().build());
    }
}
