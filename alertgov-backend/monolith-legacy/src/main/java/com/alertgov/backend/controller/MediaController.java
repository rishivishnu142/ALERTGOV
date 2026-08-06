package com.alertgov.backend.controller;

import com.alertgov.backend.entity.IncidentMedia;
import com.alertgov.backend.service.IncidentMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/v1/media")
public class MediaController {

    @Autowired
    private IncidentMediaService mediaService;

    @PostMapping("/upload/{incidentId}")
    public ResponseEntity<Map<String, String>> uploadMedia(@PathVariable String incidentId, @RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();
        try {
            IncidentMedia media = mediaService.uploadMedia(incidentId, file);
            response.put("status", "success");
            response.put("mediaId", media.getId());
            response.put("message", "File uploaded successfully to MongoDB!");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IOException e) {
            response.put("status", "error");
            response.put("message", "Failed to upload file");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadMedia(@PathVariable String id) {
        IncidentMedia media = mediaService.getMedia(id);
        if (media != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + media.getFileName() + "\"")
                    .contentType(MediaType.parseMediaType(media.getContentType()))
                    .body(media.getData());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    @GetMapping("/incident/{incidentId}")
    public ResponseEntity<List<IncidentMedia>> getMediaListForIncident(@PathVariable String incidentId) {
        return ResponseEntity.ok(mediaService.getMediaByIncident(incidentId));
    }
}
