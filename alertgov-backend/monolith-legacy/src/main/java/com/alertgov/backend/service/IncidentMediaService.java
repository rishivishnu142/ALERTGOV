package com.alertgov.backend.service;

import com.alertgov.backend.entity.IncidentMedia;
import com.alertgov.backend.repository.IncidentMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IncidentMediaService {

    @Autowired
    private IncidentMediaRepository mediaRepository;

    public IncidentMedia uploadMedia(String incidentId, MultipartFile file) throws IOException {
        IncidentMedia media = new IncidentMedia();
        media.setIncidentId(incidentId);
        media.setFileName(file.getOriginalFilename());
        media.setContentType(file.getContentType());
        media.setData(file.getBytes());
        media.setUploadedAt(LocalDateTime.now());
        
        return mediaRepository.save(media);
    }

    public IncidentMedia getMedia(String id) {
        Optional<IncidentMedia> optionalMedia = mediaRepository.findById(id);
        return optionalMedia.orElse(null);
    }

    public List<IncidentMedia> getMediaByIncident(String incidentId) {
        return mediaRepository.findByIncidentId(incidentId);
    }
}
