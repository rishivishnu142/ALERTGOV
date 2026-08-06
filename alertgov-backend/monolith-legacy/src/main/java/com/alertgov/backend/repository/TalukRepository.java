package com.alertgov.backend.repository;

import com.alertgov.backend.entity.Taluk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalukRepository extends JpaRepository<Taluk, Long> {
}
