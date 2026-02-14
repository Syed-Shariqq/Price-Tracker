package com.priceTracker.Repositories;

import com.priceTracker.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User , Long> {

    Optional<User> findByEmailOrUsername(String email, String username);
    Optional<User> findById(Long id);

}
