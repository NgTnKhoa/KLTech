package com.kltech.product_service.models.requests;

import lombok.Data;

@Data
public class CategoryRequest {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
}
