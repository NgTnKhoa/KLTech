package com.kltech.product_service.implementations.services.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kltech.product_service.entities.Product;
import com.kltech.product_service.implementations.services.BaseService;
import com.kltech.product_service.interfaces.services.product.IProductService;
import com.kltech.product_service.repositories.ProductRepository;
@Service
public class ProductService extends BaseService<Product> implements IProductService {

    public ProductService(@Autowired ProductRepository repository) {
        super(repository);
    }

}
