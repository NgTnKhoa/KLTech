package com.kltech.product_service.mappers;

import com.kltech.product_service.entities.Product;
import com.kltech.product_service.models.requests.ProductRequest;
import com.kltech.product_service.models.responses.ProductResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "category.id", target = "categoryId")
    ProductResponse toProductResponse(Product product);

    @Mapping(source = "categoryId", target = "category.id")
    Product toProductEntity(ProductRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Product toProductEntity(ProductRequest request, @MappingTarget Product product);
}
