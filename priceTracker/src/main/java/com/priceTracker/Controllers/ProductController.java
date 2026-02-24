package com.priceTracker.Controllers;

import com.priceTracker.DTOs.AddProductDTO;
import com.priceTracker.DTOs.UserTrackedProductDto;
import com.priceTracker.Entities.User;
import com.priceTracker.Services.CheckPriceService;
import com.priceTracker.Services.ProductServiceImpl;
import com.priceTracker.payload.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private CheckPriceService priceService;

    public <T> ApiResponse<T> successResponse(T data, String message, HttpStatus status){

        return ApiResponse.<T>builder()
                .timeStamp(LocalDateTime.now())
                .data(data)
                .status(status.value())
                .message(message)
                .build();
    }

    @PostMapping
    public ApiResponse<String> addProduct(@RequestBody AddProductDTO dto
                         , @AuthenticationPrincipal User user){

        productService.addProduct(dto , user);

        return successResponse("Product added Successfully"
                ,"Started Tracking the product", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserTrackedProductDto>>> getUserTrackedProducts(
            @AuthenticationPrincipal User user){

        List<UserTrackedProductDto> products = productService.getUserTrackedProducts(user);
       return ResponseEntity.ok(successResponse(products, "Products fetched successfully", HttpStatus.OK));

    }

}
