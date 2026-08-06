package com.alert.alert.repository;

import com.alert.alert.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, String> {
    List<Alert> findByTargetDistrict(String district);
    List<Alert> findByStatus(String status);
}
