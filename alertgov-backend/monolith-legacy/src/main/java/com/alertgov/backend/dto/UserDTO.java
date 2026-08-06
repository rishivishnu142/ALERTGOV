package com.alertgov.backend.dto;
public class UserDTO {
    private String userId;
    private String email;
    private String passwordHash;
    private String fullName;
    private String phoneNumber;
    private String status;
    private String currentLatitude;
    private String currentLongitude;
    private Long roleId;
    private Long stateId;
    private Long districtId;
    private Long talukId;
    private Long villageId;

    public String getUserId() { return this.userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getEmail() { return this.email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return this.passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getFullName() { return this.fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhoneNumber() { return this.phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getStatus() { return this.status; }
    public void setStatus(String status) { this.status = status; }
    public String getCurrentLatitude() { return this.currentLatitude; }
    public void setCurrentLatitude(String currentLatitude) { this.currentLatitude = currentLatitude; }
    public String getCurrentLongitude() { return this.currentLongitude; }
    public void setCurrentLongitude(String currentLongitude) { this.currentLongitude = currentLongitude; }
    public Long getRoleId() { return this.roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }
    public Long getStateId() { return this.stateId; }
    public void setStateId(Long stateId) { this.stateId = stateId; }
    public Long getDistrictId() { return this.districtId; }
    public void setDistrictId(Long districtId) { this.districtId = districtId; }
    public Long getTalukId() { return this.talukId; }
    public void setTalukId(Long talukId) { this.talukId = talukId; }
    public Long getVillageId() { return this.villageId; }
    public void setVillageId(Long villageId) { this.villageId = villageId; }
}
