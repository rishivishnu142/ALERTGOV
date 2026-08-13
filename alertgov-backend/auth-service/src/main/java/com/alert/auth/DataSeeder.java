package com.alert.auth;

import com.alert.auth.entity.AuthUser;
import com.alert.auth.repository.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUser("STA-TN", "state", "State Admin", "Tamil Nadu", "", "");
        seedUser("COL-CBE", "collector", "District Collector", "Coimbatore", "Coimbatore District", "");
        seedUser("DEC-CBE", "district", "District EOC Officer", "Coimbatore", "Coimbatore District", "");
        seedUser("TAL-COIMBATORE-SOUTH", "taluk", "Coimbatore South Taluk Officer", "Coimbatore", "Coimbatore South", "");
        seedUser("VEO-COIMBATORESOUTH-1", "village", "Coimbatore Old Village And Old Town Operator", "Coimbatore", "Coimbatore South", "Coimbatore Old Village And Old Town");
    }

    private void seedUser(String username, String role, String name, String district, String taluk, String village) {
        if (!authUserRepository.existsById(username)) {
            AuthUser user = new AuthUser();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode("admin"));
            user.setRole(role);
            user.setName(name);
            user.setDistrict(district);
            user.setTaluk(taluk);
            user.setVillage(village);
            authUserRepository.save(user);
            System.out.println("Seeded user: " + username);
        }
    }
}
