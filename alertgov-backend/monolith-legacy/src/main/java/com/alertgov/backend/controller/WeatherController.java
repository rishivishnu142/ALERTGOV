package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> current_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/weather/current");
        return ResponseEntity.ok(response);
    }

}
