package com.priceTracker.Services;

import com.priceTracker.DTOs.AddProductDTO;
import com.priceTracker.DTOs.UserTrackedProductDto;
import com.priceTracker.Entities.Product;
import com.priceTracker.Entities.User;
import com.priceTracker.Entities.UserTrackedProduct;
import com.priceTracker.Exceptions.ProductAlreadyTrackingException;
import com.priceTracker.Repositories.ProductRepository;
import com.priceTracker.Repositories.UserTrackedProductRepository;
import com.priceTracker.SeviceInterfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final UserTrackedProductRepository trackedProductRepository;


    @Override
    public void addProduct(AddProductDTO dto, User user) {

        Product product = productRepository.findByProductUrl(dto.getProductUrl())
                .orElseGet(() -> {
                      Product newProduct = new Product();
                      newProduct.setProductName(dto.getProductName());
                      newProduct.setProductUrl(dto.getProductUrl());
                      return productRepository.save(newProduct);
                        }
                );

        trackedProductRepository.findByUserIdAndProductId(user.getId() , product.getId())
                .ifPresent(p ->{
                    throw new ProductAlreadyTrackingException("Already Tracking");
                });

        UserTrackedProduct mapping = new UserTrackedProduct();

        mapping.setProduct(product);
        mapping.setUser(user);
        mapping.setTargetPrice(dto.getTargetPrice());

        trackedProductRepository.save(mapping);
    }

    @Override
    public List<UserTrackedProductDto> getUserTrackedProducts(User user) {

        List<UserTrackedProduct> trackedProducts =
                         trackedProductRepository.findByUserId(user.getId());

        return trackedProducts.stream().map(mapping -> UserTrackedProductDto.builder()
                .id(mapping.getId())
                .productName(mapping.getProduct().getProductName())
                .productUrl(mapping.getProduct().getProductUrl())
                .currentPrice(mapping.getProduct().getCurrentPrice())
                .targetPrice(mapping.getTargetPrice())
                .lastCheckedAt(mapping.getProduct().getLastCheckedAt())
                .build()).toList();
    }
}
