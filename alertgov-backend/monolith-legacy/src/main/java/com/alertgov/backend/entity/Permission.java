package com.alertgov.backend.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "AG_PERMISSIONS")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long permissionId;


    public Long getPermissionId() { return this.permissionId; }
    public void setPermissionId(Long permissionId) { this.permissionId = permissionId; }
}
