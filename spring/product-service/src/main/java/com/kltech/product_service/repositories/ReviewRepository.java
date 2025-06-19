package com.kltech.product_service.repositories;

import com.kltech.product_service.entities.Product;
import com.kltech.product_service.entities.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, String> {

  List<Review> findAllByProduct_Id(String productId);
}