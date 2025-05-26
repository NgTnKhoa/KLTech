package com.kltech.product_service.services.impls;

import com.kltech.product_service.entities.Category;
import com.kltech.product_service.mappers.CategoryMapper;
import com.kltech.product_service.models.requests.CategoryRequest;
import com.kltech.product_service.models.responses.CategoryResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.kltech.product_service.services.ICategoryService;
import com.kltech.product_service.repositories.CategoryRepository;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {

  private final CategoryMapper categoryMapper;
  private final CategoryRepository categoryRepository;

  @Override
  public List<CategoryResponse> findAll() {
    return categoryRepository.findAll().stream().map(categoryMapper::toCategoryResponse).toList();
  }

  @Override
  public CategoryResponse create(CategoryRequest categoryRequest) {
    return categoryMapper.toCategoryResponse(
        categoryRepository.save(
            categoryMapper.toProductEntity(categoryRequest)));
  }

  @Override
  public CategoryResponse update(String id, CategoryRequest categoryRequest) {
    Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
    return categoryMapper.toCategoryResponse(
        categoryRepository.save(
            categoryMapper.toProductEntity(categoryRequest, category)));
  }

  @Override
  public void delete(String id) {
    if (categoryRepository.existsById(id)) {
      categoryRepository.deleteById(id);
    } else {
      throw new RuntimeException("Category not found");
    }
  }

  @Override
  public CategoryResponse findById(String id) {
    return categoryRepository.findById(id).map(categoryMapper::toCategoryResponse).orElseThrow(() -> new RuntimeException("Category not found"));
  }
}
