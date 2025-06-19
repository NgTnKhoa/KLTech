package com.kltech.cart_service.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Table(name = "cartItem")
@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class CartItem extends BaseEntity {
  private Long productId;
  private Integer quantity;
  private Double price;
  private String productName;
  private String productImage;
  private Long cartId;
  private Double discount;
}
