package com.kltech.cart_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kltech.cart_service.entities.Cart;

public interface  CartRepository extends JpaRepository<Cart, Long> {
  
}
