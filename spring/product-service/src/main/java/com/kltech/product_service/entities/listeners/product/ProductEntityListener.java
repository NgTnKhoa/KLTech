package com.kltech.product_service.entities.listeners.product;

import com.kltech.product_service.entities.Product;
import com.kltech.product_service.utils.StringUtils;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public class ProductEntityListener {
    private void onUpdate(Product product) {
        product.setName(StringUtils.toSlug(product.getName()));
    }

    @PrePersist
    public void prePersist(Product product) {
        this.onUpdate(product);
    }

    @PreUpdate
    public void preUpdate(Product product) {
        this.onUpdate(product);
    }
}
