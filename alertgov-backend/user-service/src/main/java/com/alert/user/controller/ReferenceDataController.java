package com.alert.user.controller;

import com.alert.user.entity.District;
import com.alert.user.entity.Resource;
import com.alert.user.repository.DistrictRepository;
import com.alert.user.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reference")
public class ReferenceDataController {

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @GetMapping("/districts")
    public ResponseEntity<List<District>> getAllDistricts() {
        return ResponseEntity.ok(districtRepository.findAll());
    }

    @GetMapping("/resources")
    public ResponseEntity<List<Resource>> getAllResources() {
        return ResponseEntity.ok(resourceRepository.findAll());
    }

    @GetMapping("/resources/location/{location}")
    public ResponseEntity<List<Resource>> getResourcesByLocation(@PathVariable String location) {
        return ResponseEntity.ok(resourceRepository.findByLocation(location));
    }

    @PostMapping("/districts")
    public ResponseEntity<List<District>> saveDistricts(@RequestBody List<District> districts) {
        return ResponseEntity.ok(districtRepository.saveAll(districts));
    }

    @PostMapping("/resources")
    public ResponseEntity<List<Resource>> saveResources(@RequestBody List<Resource> resources) {
        return ResponseEntity.ok(resourceRepository.saveAll(resources));
    }
}
