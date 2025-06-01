package com.kltech.product_service.models.responses;

import lombok.Data;

@Data
public class ProductResponse {
    private String id;
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
    private double price;
    private double discount;
    private String status;
    private boolean featured;
    private String categoryId;
}
