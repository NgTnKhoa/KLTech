package com.kltech.product_service.models.mappers;

import com.kltech.product_service.entities.Category;
import com.kltech.product_service.models.requests.CategoryRequest;
import com.kltech.product_service.utils.StringUtils;

public class CategoryMapper {
    public static Category toEntity(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName());
        category.setSlug(StringUtils.toSlug(request.getName()));
        category.setDescription(request.getDescription());
        category.setThumbnail(request.getThumbnail());
        return category;
    }

    public static CategoryRequest toRequest(Category entity) {
        CategoryRequest categoryRequest = new CategoryRequest();
        categoryRequest.setName(entity.getName());
        categoryRequest.setSlug(entity.getSlug());
        categoryRequest.setDescription(entity.getDescription());
        categoryRequest.setThumbnail(entity.getThumbnail());
        return categoryRequest;
    }
}
