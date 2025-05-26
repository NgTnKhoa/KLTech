package com.kltech.product_service.services;

import com.kltech.product_service.models.requests.CategoryRequest;
import com.kltech.product_service.models.responses.CategoryResponse;
import jakarta.transaction.Transactional;
import java.util.List;

public interface ICategoryService {

  List<CategoryResponse> findAll();

  @Transactional
  CategoryResponse create(CategoryRequest categoryRequest);

  @Transactional
  CategoryResponse update(String id, CategoryRequest categoryRequest);

  @Transactional
  void delete(String id);

  @Transactional
  CategoryResponse findById(String id);
}
