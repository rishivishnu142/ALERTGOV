package com.alertgov.backend.dto;
public class RoleDTO {
    private Long roleId;
    private String roleName;
    private String description;

    public Long getRoleId() { return this.roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }
    public String getRoleName() { return this.roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
    public String getDescription() { return this.description; }
    public void setDescription(String description) { this.description = description; }
}
