package com.kltech.product_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kltech.product_service.entities.Product;
import com.kltech.product_service.repositories.ProductRepository;
@Service
public class ProductService extends BaseService<Product> {

    public ProductService(@Autowired ProductRepository repository) {
        super(repository);
    }

}
