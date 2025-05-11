package com.kltech.product_service.entities;

import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Table(name = "products")
@Data
@EqualsAndHashCode(callSuper = true)
public class Product extends BaseEntity {
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
    private String price;
    private String discount;
    private String status;
    private Long categoryId;
}
