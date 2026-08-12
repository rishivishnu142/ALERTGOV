package com.alert.incident.repository.mongo;

import com.alert.incident.entity.IncidentMedia;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface IncidentMediaRepository extends MongoRepository<IncidentMedia, String> {
    List<IncidentMedia> findByIncidentId(String incidentId);
}
