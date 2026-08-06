package com.alertgov.backend.service;
import com.alertgov.backend.entity.User;
import com.alertgov.backend.repository.UserRepository;
import com.alertgov.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() { return userRepository.findAll(); }
    
    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
    
    public User createUser(User user) { return userRepository.save(user); }
    
    public void deleteUser(String id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
