package com.kltech.product_service.interfaces.product;

import com.kltech.product_service.entities.BaseEntity;
import com.kltech.product_service.interfaces.IService;

public interface IProductService<T extends BaseEntity> extends IService<T> {
    
}
