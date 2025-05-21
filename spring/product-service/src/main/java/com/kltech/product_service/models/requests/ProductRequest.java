package com.kltech.product_service.models.requests;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
    private String price;
    private String discount;
    private String status;
    private Long categoryId;
}
