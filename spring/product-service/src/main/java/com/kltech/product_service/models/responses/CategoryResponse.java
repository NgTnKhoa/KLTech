package com.kltech.product_service.models.responses;

import java.util.List;
import lombok.Data;

@Data
public class CategoryResponse {
    private String id;
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
    private List<ProductResponse> products;
}
