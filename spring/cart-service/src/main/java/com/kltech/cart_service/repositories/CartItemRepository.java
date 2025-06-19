package com.kltech.cart_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kltech.cart_service.entities.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
  
}
