package com.priceTracker.Services;

import com.priceTracker.DTOs.*;
import com.priceTracker.Entities.Product;
import com.priceTracker.Entities.ProductPriceHistory;
import com.priceTracker.Entities.User;
import com.priceTracker.Entities.UserTrackedProduct;
import com.priceTracker.Exceptions.ProductAlreadyTrackingException;
import com.priceTracker.Exceptions.ProductNotFoundException;
import com.priceTracker.Repositories.ProductHistoryRepository;
import com.priceTracker.Repositories.ProductRepository;
import com.priceTracker.Repositories.UserTrackedProductRepository;
import com.priceTracker.SeviceInterfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final UserTrackedProductRepository trackedProductRepository;

    @Autowired
    private final ProductProcessingService processingService;

    @Autowired
    private final ProductHistoryRepository historyRepository;


    @Override
    @CacheEvict(value = "userTrackedProducts" , key = "#user.id")
    public void addProduct(AddProductDTO dto, User user) {

        Product product = productRepository.findByProductUrl(dto.getProductUrl())
                .orElseGet(() -> {

                     ScrapeResponseDTO scrapeInfo = processingService.fetchPrice(dto.getProductUrl());

                      Product newProduct = new Product();
                      newProduct.setProductName(scrapeInfo.getTitle());
                      newProduct.setCurrentPrice(scrapeInfo.getPrice());
                      newProduct.setDescription(scrapeInfo.getDescription());
                      newProduct.setImgUrl(scrapeInfo.getImgUrl());
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
    @Cacheable(value = "userTrackedProducts" , key = "#user.id")
    public List<UserTrackedProductDto> getUserTrackedProducts(User user) {

        List<UserTrackedProduct> trackedProducts =
                         trackedProductRepository.findByUserId(user.getId());

        return trackedProducts.stream().map(mapping -> UserTrackedProductDto.builder()
                .id(mapping.getProduct().getId())
                .productName(mapping.getProduct().getProductName())
                .imgUrl(mapping.getProduct().getImgUrl())
                .description(mapping.getProduct().getDescription())
                .productUrl(mapping.getProduct().getProductUrl())
                .currentPrice(mapping.getProduct().getCurrentPrice())
                .targetPrice(mapping.getTargetPrice())
                .lastCheckedAt(mapping.getProduct().getLastCheckedAt())
                .build()).toList();
    }

    @CacheEvict(value = "userTrackedProducts", key = "#userId")
    public String removeProductFromTracking(Long trackingId, Long userId){

        UserTrackedProduct removedProduct = trackedProductRepository
                .findByIdAndUserId(trackingId, userId)
                   .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        trackedProductRepository.delete(removedProduct);

        return "Product removed Successfully";
    }

    public ProductAnalyticsResponse getProductAnalytics(Long id){

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        List<ProductPriceHistory> history =
                historyRepository.findByProductIdOrderByCheckedAtAsc(id);

        BigDecimal lowestPrice = history.stream()
                .map(ProductPriceHistory::getPrice)
                .min(BigDecimal::compareTo)
                .orElse(product.getCurrentPrice());

        ProductDto dto = new ProductDto(
                product.getId(),
                product.getProductName(),
                product.getImgUrl(),
                product.getDescription(),
                product.getCurrentPrice(),
                lowestPrice
        );

        List<ProductPriceHistoryDto> historyDto = history.stream()
                .map(h -> new ProductPriceHistoryDto(h.getPrice(), h.getCheckedAt()))
                .toList();

        return new ProductAnalyticsResponse(dto, historyDto);
    }


}
