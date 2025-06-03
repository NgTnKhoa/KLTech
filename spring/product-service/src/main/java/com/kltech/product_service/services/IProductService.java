package com.kltech.product_service.services;

import com.kltech.product_service.models.requests.ProductRequest;
import com.kltech.product_service.models.responses.ProductResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Set;

public interface IProductService {

  List<ProductResponse> findAll();

  @Transactional
  ProductResponse create(ProductRequest productRequest);

  @Transactional
  ProductResponse update(String id, ProductRequest productRequest);

  @Transactional
  void delete(String id);

  ProductResponse findById(String id);

  List<ProductResponse> findByCategoryId(String categoryId);

  List<ProductResponse> findAllFeaturedProducts();
}
