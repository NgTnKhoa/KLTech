package com.kltech.product_service.models.mappers;

import com.kltech.product_service.entities.Product;
import com.kltech.product_service.models.requests.ProductRequest;
import com.kltech.product_service.utils.StringUtils;

public class ProductMapper {
    public static Product toEntity(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setSlug(StringUtils.toSlug(request.getName()));
        product.setDescription(request.getDescription());
        product.setThumbnail(request.getThumbnail());
        product.setPrice(request.getPrice());
        product.setDiscount(request.getDiscount());
        product.setStatus(request.getStatus());
        product.setCategoryId(request.getCategoryId());
        return product;
    }

    public static ProductRequest toRequest(Product entity) {
        ProductRequest productRequest = new ProductRequest();
        productRequest.setName(entity.getName());
        productRequest.setSlug(entity.getSlug());
        productRequest.setDescription(entity.getDescription());
        productRequest.setThumbnail(entity.getThumbnail());
        productRequest.setPrice(entity.getPrice());
        productRequest.setDiscount(entity.getDiscount());
        productRequest.setStatus(entity.getStatus());
        productRequest.setCategoryId(entity.getCategoryId());
        return productRequest;
    }
}
