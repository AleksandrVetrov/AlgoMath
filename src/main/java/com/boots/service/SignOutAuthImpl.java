package com.boots.service;

import com.boots.jwt.JwtUtils;
import com.boots.payload.response.MessageResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class SignOutAuthImpl implements SignOutService {

        private final RefreshTokenService refreshTokenService;
        private final JwtUtils jwtUtils;


    public SignOutAuthImpl(RefreshTokenService refreshTokenService, JwtUtils jwtUtils) {
        this.refreshTokenService = refreshTokenService;
        this.jwtUtils = jwtUtils;
    }

    @Override
        public ResponseEntity<?> logoutUser() {
            Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!Objects.equals(principle.toString(), "anonymousUser")) {
                Long userId = ((UserDetailsImpl) principle).getId();
                refreshTokenService.deleteByUserId(userId);
            }

            ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie();
            ResponseCookie jwtRefreshCookie = jwtUtils.getCleanJwtRefreshCookie();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
                    .body(new MessageResponse("You've been signed out!"));
        }
    }
