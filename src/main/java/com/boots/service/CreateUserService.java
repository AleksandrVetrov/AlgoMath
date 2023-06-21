package com.boots.service;

import com.boots.exception.CustomException;
import com.boots.entity.ConfirmationToken;
import com.boots.entity.EnumRole;
import com.boots.entity.Role;
import com.boots.entity.User;
import com.boots.payload.request.SignupRequest;
import com.boots.repository.ConfirmationTokenRepository;
import com.boots.repository.RoleRepository;
import com.boots.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class CreateUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    ConfirmationTokenRepository confirmationTokenRepository;
    EmailService emailService;
    EmailBuilder emailBuilder;

    public void registerNewUser(SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new CustomException("USERNAME_EXISTS","Username is already in use");
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new CustomException("EMAIL_EXISTS","Email is already in use");
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
            strRoles.forEach(role -> roles.add(getRoleByName(role)));
        }

        user.setRoles(roles);
        userRepository.save(user);

        ConfirmationToken confirmationToken = new ConfirmationToken(user);

        confirmationTokenRepository.save(confirmationToken);
        emailService.send(
                user.getEmail(),
                emailBuilder.buildEmailConfirmation(user.getUsername(), "http://localhost:8080/api/auth/confirm-account?token=" + confirmationToken.getConfirmationToken()));
        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());
    }

    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if (token != null) {
            User user = userRepository.findByEmail(token.getUserEntity().getEmail());
            user.setEnabled(true);
            userRepository.save(user);
            return ResponseEntity.ok("Email verified successfully!");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }

    private Role getRoleByName(String roleName) {
        return roleRepository.findByName(EnumRole.valueOf(roleName))
                .orElseThrow(() -> new CustomException("ROLE_NOT_FOUND","Role is not found."));
    }

}
