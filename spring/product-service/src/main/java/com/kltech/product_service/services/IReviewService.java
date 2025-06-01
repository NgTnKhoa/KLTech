package com.kltech.product_service.services;

import com.kltech.product_service.models.requests.ReviewRequest;
import com.kltech.product_service.models.responses.ReviewResponse;
import jakarta.transaction.Transactional;
import java.util.List;

public interface IReviewService {

  @Transactional
  ReviewResponse create(ReviewRequest reviewRequest);

  @Transactional
  ReviewResponse update(String id, ReviewRequest reviewRequest);

  @Transactional
  void delete(String id);

  List<ReviewResponse> findByReviewId(String categoryId);
}
