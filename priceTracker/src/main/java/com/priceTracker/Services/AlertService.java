package com.priceTracker.Services;

import com.priceTracker.DTOs.AlertDto;
import com.priceTracker.Entities.Alert;
import com.priceTracker.Repositories.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    private AlertDto mapToDto(Alert alert){

        AlertDto dto = new AlertDto();

        dto.setProductName(alert.getProductName());
        dto.setOldPrice(alert.getOldPrice());
        dto.setNewPrice(alert.getNewPrice());
        dto.setDescription(alert.getDescription());
        dto.setAlertType(alert.getAlertType());
        dto.setImgUrl(alert.getImgUrl());
        dto.setCreatedAt(alert.getCreatedAt());

        return dto;
    }

    public List<AlertDto> getUserAlerts(Long userId){

        return alertRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }
}
