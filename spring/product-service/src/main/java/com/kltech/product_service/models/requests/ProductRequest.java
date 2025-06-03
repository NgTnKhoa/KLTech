package com.kltech.product_service.models.requests;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
    private double price;
    private double discount;
    private String status;
    private String[] colors;
    private boolean featured;
    private String categoryId;
}
