package com.alert.user.controller;

import com.alert.user.entity.Employee;
import com.alert.user.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/profile/{username}")
    public ResponseEntity<Employee> getProfile(@PathVariable String username) {
        Optional<Employee> employee = employeeRepository.findById(username);
        return employee.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/profile")
    public ResponseEntity<Employee> createProfile(@RequestBody Employee employee) {
        return ResponseEntity.ok(employeeRepository.save(employee));
    }
}
