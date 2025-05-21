package com.kltech.product_service.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Table(name = "categories")
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Category extends BaseEntity {
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
}
