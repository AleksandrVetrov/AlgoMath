package com.boots.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.boots.jwt.JwtUtils;
import com.boots.payload.request.LoginRequest;
import com.boots.payload.request.SignupRequest;
import com.boots.payload.response.MessageResponse;
import com.boots.repository.RoleRepository;
import com.boots.repository.UserRepository;
import com.boots.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    final CreateUserService createUserService;
    final RefreshTokenAuthService refreshTokenAuthService;
    final SignOutService signOutService;
    final
    AuthenticationManager authenticationManager;

    final
    UserRepository userRepository;

    final
    RoleRepository roleRepository;

    final
    PasswordEncoder encoder;


    private final SignInAuthService signInAuthService;
    final RefreshTokenService refreshTokenService;
    final
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return signInAuthService.authenticateUser(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        createUserService.registerNewUser(signUpRequest);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        return signOutService.logoutUser();
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        return refreshTokenAuthService.refreshToken(request);
    }

    @RequestMapping(value = "/confirm-account", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token") String confirmationToken) {
        return createUserService.confirmEmail(confirmationToken);
    }
}