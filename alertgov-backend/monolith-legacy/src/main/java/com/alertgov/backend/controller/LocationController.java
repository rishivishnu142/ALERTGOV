package com.alertgov.backend.controller;
import com.alertgov.backend.entity.State;
import com.alertgov.backend.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/locations")

public class LocationController {
    
    @Autowired
    private StateRepository stateRepository;

    @GetMapping("/states")
    public List<State> getAllStates() { 
        return stateRepository.findAll(); 
    }
}
