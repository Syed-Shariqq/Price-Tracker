package com.priceTracker.SeviceInterfaces;

import com.priceTracker.DTOs.AddProductDTO;
import com.priceTracker.DTOs.UserTrackedProductDto;
import com.priceTracker.Entities.User;

import java.util.List;


public interface ProductService {

   public void addProduct(AddProductDTO dto , User user);

   public List<UserTrackedProductDto> getUserTrackedProducts(User user);
}
