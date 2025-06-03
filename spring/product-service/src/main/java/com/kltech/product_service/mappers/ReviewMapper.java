package com.kltech.product_service.mappers;

import com.kltech.product_service.entities.Review;
import com.kltech.product_service.models.requests.ReviewRequest;
import com.kltech.product_service.models.responses.ReviewResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(source = "product.id", target = "productId")
    ReviewResponse toReviewResponse(Review review);

    @Mapping(source = "productId", target = "product.id")
    Review toReviewEntity(ReviewRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Review toReviewEntity(ReviewRequest request, @MappingTarget Review review);
}
