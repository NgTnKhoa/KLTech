package com.kltech.cart_service.models.requests;

import lombok.Data;

@Data
public class CartItemRequest {
  private Long id;
  private Long productId;
  private Integer quantity;
  private Double price;
  private String productName;
  private String productImage;
  private Long cartId;
  private Double discount;
}
