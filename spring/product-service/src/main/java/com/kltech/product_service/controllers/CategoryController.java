package com.kltech.product_service.controllers;

import com.kltech.product_service.models.responses.CategoryResponse;
import com.kltech.product_service.models.responses.ProductResponse;
import com.kltech.product_service.services.IProductService;
import java.util.List;

import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kltech.product_service.services.ICategoryService;
import com.kltech.product_service.models.requests.CategoryRequest;
import com.kltech.product_service.models.responses.BaseResponse;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

  private final ICategoryService categoryService;
  private final IProductService productService;

  @GetMapping
  public ResponseEntity<BaseResponse> findAll() {
    List<CategoryResponse> categories = categoryService.findAll();
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .message("Get All Categories Successfully")
            .status(true)
            .data(categories)
            .statusCode(200)
            .build());
  }

  @GetMapping("/{id}/products")
  public ResponseEntity<BaseResponse> findAllProducts(@PathVariable String id) {
    List<ProductResponse> products = productService.findByCategoryId(id);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .message("Get All Products By Category ID Successfully")
            .status(true)
            .data(products)
            .statusCode(200)
            .build());
  }

  @GetMapping("/{id}")
  public ResponseEntity<BaseResponse> findById(@PathVariable String id) {
    CategoryResponse category = categoryService.findById(id);
    if (category == null) {
      return ResponseEntity
          .status(404)
          .body(BaseResponse.builder()
              .data(null)
              .statusCode(404)
              .status(false)
              .message("Not found")
              .build());
    }

    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .message("Get category successfully")
            .status(true)
            .statusCode(200)
            .data(category)
            .build());
  }

  @PostMapping
  public ResponseEntity<BaseResponse> create(@RequestBody CategoryRequest categoryRequest) {
    CategoryResponse createdCategory = categoryService.create(categoryRequest);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(createdCategory)
            .statusCode(201)
            .status(true)
            .build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<BaseResponse> update(@PathVariable String id, @RequestBody CategoryRequest categoryRequest) {
    CategoryResponse updatedCategory = categoryService.update(id, categoryRequest);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(updatedCategory)
            .statusCode(200)
            .status(true)
            .build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<BaseResponse> delete(@PathVariable String id) {
    categoryService.delete(id);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(null)
            .statusCode(200)
            .status(true)
            .build());
  }

  @GetMapping("/{id}/colors")
  public ResponseEntity<BaseResponse> findAllColors(@PathVariable String id) {
    Set<String> colors = categoryService.findAllColors(id);
    return ResponseEntity.ok()
        .body(BaseResponse.builder()
            .message("Get All Colors Successfully")
            .status(true)
            .data(colors)
            .statusCode(200)
            .build());
  }
}
