package com.kltech.product_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kltech.product_service.entities.Product;

public interface ProductRepository extends JpaRepository<Product, String> {
    
}