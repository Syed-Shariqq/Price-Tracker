package com.priceTracker.Services;

import com.priceTracker.DTOs.ChangePassDto;
import com.priceTracker.Entities.User;
import com.priceTracker.Exceptions.InvalidCredentialsException;
import com.priceTracker.Exceptions.UserNotFoundException;
import com.priceTracker.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String info) throws UsernameNotFoundException {

        return userRepository.findByEmailOrUsername(info , info)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }

    public String changePassword(Long userId, ChangePassDto req) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // 🔒 verify current password
        if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Current password is incorrect");
        }
        if (passwordEncoder.matches(req.getNewPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("New password cannot be same as old password");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        return "Password successfully updated";
    }
}
