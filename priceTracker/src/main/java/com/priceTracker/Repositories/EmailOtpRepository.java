package com.priceTracker.Repositories;

import com.priceTracker.Entities.EmailOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmailOtpRepository extends JpaRepository<EmailOtp , Long> {


    Optional<EmailOtp> findByEmailAndVerifiedFalse(String email);

    void deleteByEmail(String email);

}
