package com.alertgov.backend.repository;

import com.alertgov.backend.entity.IncidentMedia;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface IncidentMediaRepository extends MongoRepository<IncidentMedia, String> {
    List<IncidentMedia> findByIncidentId(String incidentId);
}
