package com.boots.scheduled;

import com.boots.entity.RefreshToken;
import com.boots.repository.RefreshTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
@AllArgsConstructor
public class TokenCleanupTask {

    private RefreshTokenRepository refreshTokenRepository;

    @Scheduled(fixedDelay = 24 * 60 * 60 * 1000) // каждый день
    public void removeExpiredTokens() {
        Instant now = Instant.now();
        List<RefreshToken> expiredTokens = refreshTokenRepository.findAllByExpiryDateBefore(now);
        refreshTokenRepository.deleteAll(expiredTokens);
    }
}