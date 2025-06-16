package com.kltech.product_service.models.requests;

import lombok.Data;

@Data
public class ReviewRequest {
    private int rating;
    private String content;
    private String author;
    private String productId;
}
