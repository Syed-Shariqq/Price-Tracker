package com.priceTracker.Controllers;

import com.priceTracker.DTOs.AddProductDTO;
import com.priceTracker.DTOs.UserTrackedProductDto;
import com.priceTracker.Entities.User;
import com.priceTracker.Services.CheckPriceService;
import com.priceTracker.Services.ProductServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private CheckPriceService priceService;

    @PostMapping
    public String addProduct(@RequestBody AddProductDTO dto
                         , @AuthenticationPrincipal User user){

        productService.addProduct(dto , user);

        return "Product added Successfully";
    }

    @GetMapping
    public ResponseEntity<List<UserTrackedProductDto>> getUserTrackedProducts(
            @AuthenticationPrincipal User user){

       return ResponseEntity.ok(productService.getUserTrackedProducts(user));

    }

}
