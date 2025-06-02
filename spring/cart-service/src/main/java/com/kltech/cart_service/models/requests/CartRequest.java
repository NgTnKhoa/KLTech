package com.kltech.cart_service.models.requests;

import java.util.ArrayList;
import java.util.List;

import com.kltech.cart_service.entities.CartItem;

import lombok.Data;


@Data
public class CartRequest {
  private Long id;
    private String userId;
    private List<CartItem> items = new ArrayList<>();
    private Double totalPrice;
    private String status;
    private String shippingAddress;
    private Long expirationTime;
}
