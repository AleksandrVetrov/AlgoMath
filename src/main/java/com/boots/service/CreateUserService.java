package com.boots.service;

import com.boots.entity.EnumRole;
import com.boots.entity.Role;
import com.boots.entity.User;
import com.boots.payload.request.SignupRequest;
import com.boots.repository.RoleRepository;
import com.boots.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CreateUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    public CreateUserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerNewUser(SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new IllegalArgumentException("Username is already taken");
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        User user = new User(
                signupRequest.getUsername(),
                signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword())
        );

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            roles.add(getRoleByName(String.valueOf(EnumRole.ROLE_USER)));
        } else {
            strRoles.forEach(role -> {
                roles.add(getRoleByName(role));
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
        return user;
    }

    private Role getRoleByName(String roleName) {
        return roleRepository.findByName(EnumRole.valueOf(roleName))
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    }
}
