package com.kltech.product_service.services.impls;

import com.kltech.product_service.entities.Review;
import com.kltech.product_service.models.requests.ReviewRequest;
import com.kltech.product_service.models.responses.ReviewResponse;
import com.kltech.product_service.repositories.ReviewRepository;
import com.kltech.product_service.services.IReviewService;
import com.kltech.product_service.mappers.ReviewMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

  private final ReviewMapper reviewMapper;
  private final ReviewRepository reviewRepository;

  @Override
  public ReviewResponse create(ReviewRequest reviewRequest) {
    return reviewMapper.toReviewResponse(
        reviewRepository.save(
            reviewMapper.toReviewEntity(reviewRequest)));
  }

  @Override
  public ReviewResponse update(String id, ReviewRequest reviewRequest) {
    Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
    return reviewMapper.toReviewResponse(
        reviewRepository.save(
            reviewMapper.toReviewEntity(reviewRequest, review)));
  }

  @Override
  public void delete(String id) {
    if (reviewRepository.existsById(id)) {
      reviewRepository.deleteById(id);
    } else {
      throw new RuntimeException("Review not found");
    }
  }

  @Override
  public List<ReviewResponse> findByReviewId(String categoryId) {
    return reviewRepository.findAllByProduct_Id(categoryId).stream().map(reviewMapper::toReviewResponse).toList();
  }
}
