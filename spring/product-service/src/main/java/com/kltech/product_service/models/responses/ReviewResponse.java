package com.kltech.product_service.models.responses;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ReviewResponse {
    private String id;
    private int rating;
    private String content;
    private String author;
    private String productId;
    private LocalDateTime createdAt;
}
