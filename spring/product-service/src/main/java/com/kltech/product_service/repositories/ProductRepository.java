package com.kltech.product_service.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kltech.product_service.entities.Product;

public interface ProductRepository extends JpaRepository<Product, String> {

  List<Product> findAllByCategory_Id(String categoryId);

  String id(String id);
}