package com.kltech.product_service.controllers;

import com.kltech.product_service.models.requests.ReviewRequest;
import com.kltech.product_service.models.responses.BaseResponse;
import com.kltech.product_service.models.responses.ReviewResponse;
import com.kltech.product_service.services.IReviewService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewController {

  private final IReviewService reviewService;

  @GetMapping("/products/{productId}/reviews")
  public ResponseEntity<BaseResponse> findAllByProductId(@PathVariable String productId) {
    List<ReviewResponse> reviews = reviewService.findByReviewId(productId);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .message("Get All Reviews By Product ID Successfully")
            .status(true)
            .data(reviews)
            .statusCode(200)
            .build());
  }

  @PostMapping("/reviews")
  public ResponseEntity<BaseResponse> create(@RequestBody ReviewRequest reviewRequest) {
    ReviewResponse createdReview = reviewService.create(reviewRequest);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(createdReview)
            .statusCode(201)
            .status(true)
            .build());
  }

  @PutMapping("/reviews/{id}")
  public ResponseEntity<BaseResponse> update(@PathVariable String id, @RequestBody ReviewRequest reviewRequest) {
    ReviewResponse updatedReview = reviewService.update(id, reviewRequest);

    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(updatedReview)
            .statusCode(200)
            .status(true)
            .build());
  }

  @DeleteMapping("reviews/{id}")
  public ResponseEntity<BaseResponse> delete(@PathVariable String id) {
    reviewService.delete(id);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(null)
            .statusCode(200)
            .status(true)
            .build());
  }
}
