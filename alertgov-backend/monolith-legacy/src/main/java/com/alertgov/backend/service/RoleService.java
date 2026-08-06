package com.alertgov.backend.service;
import com.alertgov.backend.entity.Role;
import com.alertgov.backend.repository.RoleRepository;
import com.alertgov.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() { return roleRepository.findAll(); }
    
    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
    }
    
    public Role createRole(Role role) { return roleRepository.save(role); }
    
    public void deleteRole(Long id) {
        Role role = getRoleById(id);
        roleRepository.delete(role);
    }
}
