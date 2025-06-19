package com.kltech.product_service.mappers;

import com.kltech.product_service.entities.Category;
import com.kltech.product_service.models.requests.CategoryRequest;
import com.kltech.product_service.models.responses.CategoryResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(source = "products", target = "products")
    CategoryResponse toCategoryResponse(Category category);

    Category toProductEntity(CategoryRequest categoryRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Category toProductEntity(CategoryRequest categoryRequest, @MappingTarget Category category);
}
