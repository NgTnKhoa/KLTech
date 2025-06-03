package com.kltech.product_service.models.responses;

import lombok.Data;

@Data
public class ReviewResponse {
    private String id;
    private int rating;
    private String content;
    private String productId;
}
