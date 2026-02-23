package com.priceTracker.Repositories;

import com.priceTracker.Entities.ResetPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResetTokenRepository extends JpaRepository<ResetPasswordToken , Long> {

    Optional<ResetPasswordToken> findByEmailAndUsedFalse(String email);

    Optional<ResetPasswordToken> findByHashToken(String token);

    void deleteByEmail(String email);
}
