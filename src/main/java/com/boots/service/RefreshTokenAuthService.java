package com.boots.service;

import com.boots.entity.RefreshToken;
import com.boots.entity.User;
import com.boots.exception.TokenRefreshException;
import com.boots.jwt.JwtUtils;
import com.boots.payload.response.MessageResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
public class RefreshTokenAuthService {
    private final RefreshTokenService refreshTokenService;
    private final JwtUtils jwtUtils;

    public RefreshTokenAuthService(RefreshTokenService refreshTokenService, JwtUtils jwtUtils) {
        this.refreshTokenService = refreshTokenService;
        this.jwtUtils = jwtUtils;
    }

    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        String refreshToken = jwtUtils.getJwtRefreshFromCookies(request);

        if (refreshToken.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Refresh token is empty!"));
        }

        Optional<RefreshToken> optionalRefreshToken = refreshTokenService.findByToken(refreshToken);
        if (optionalRefreshToken.isEmpty()) {
            throw new TokenRefreshException(refreshToken, "Refresh token is not in database!");
        }

        RefreshToken refreshTokenObj = optionalRefreshToken.get();
        refreshTokenService.verifyExpiration(refreshTokenObj);

        User user = refreshTokenObj.getUser();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(user);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new MessageResponse("Token is refreshed successfully!"));
    }
}
