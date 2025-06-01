package com.kltech.product_service.controllers;

import com.kltech.product_service.models.responses.ProductResponse;
import com.kltech.product_service.models.responses.ReviewResponse;
import com.kltech.product_service.services.IProductService;
import com.kltech.product_service.services.IReviewService;
import java.util.List;

import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltech.product_service.models.requests.ProductRequest;
import com.kltech.product_service.models.responses.BaseResponse;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

  private final IProductService productService;
  private final IReviewService reviewService;

  @GetMapping
  public ResponseEntity<BaseResponse> findAll() {
    List<ProductResponse> products = productService.findAll();
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .message("Get All Products Successfully")
            .status(true)
            .data(products)
            .statusCode(200)
            .build());
  }

  @GetMapping("/{id}/reviews")
  public ResponseEntity<BaseResponse> findAllReviews(@PathVariable String id) {
    List<ReviewResponse> reviews = reviewService.findByReviewId(id);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .message("Get All Reviews By Product ID Successfully")
            .status(true)
            .data(reviews)
            .statusCode(200)
            .build());
  }

  @GetMapping("/{id}")
  public ResponseEntity<BaseResponse> findById(@PathVariable String id) {
    ProductResponse product = productService.findById(id);
    return ResponseEntity.ok()
        .body(BaseResponse.builder()
            .message("Get product successfully")
            .status(true)
            .statusCode(200)
            .data(product)
            .build());
  }

  @PostMapping
  public ResponseEntity<BaseResponse> create(@RequestBody ProductRequest productRequest) {
    ProductResponse createdProduct = productService.create(productRequest);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(createdProduct)
            .statusCode(201)
            .status(true)
            .build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<BaseResponse> update(@PathVariable String id, @RequestBody ProductRequest productRequest) {
    ProductResponse updatedProduct = productService.update(id, productRequest);

    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(updatedProduct)
            .statusCode(200)
            .status(true)
            .build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<BaseResponse> delete(@PathVariable String id) {
    productService.delete(id);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(null)
            .statusCode(200)
            .status(true)
            .build());
  }
}
