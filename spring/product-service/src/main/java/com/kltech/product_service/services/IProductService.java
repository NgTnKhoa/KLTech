package com.kltech.product_service.services;

import com.kltech.product_service.models.requests.ProductRequest;
import com.kltech.product_service.models.responses.ProductResponse;
import jakarta.transaction.Transactional;
import java.util.List;

public interface IProductService {

  List<ProductResponse> findAll();

  @Transactional
  ProductResponse create(ProductRequest productRequest);

  @Transactional
  ProductResponse update(String id, ProductRequest productRequest);

  @Transactional
  void delete(String id);

  @Transactional
  ProductResponse findById(String id);

  List<ProductResponse> findByCategoryId(String categoryId);
}
