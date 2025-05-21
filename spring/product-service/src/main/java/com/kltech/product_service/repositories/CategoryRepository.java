package com.kltech.product_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kltech.product_service.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
