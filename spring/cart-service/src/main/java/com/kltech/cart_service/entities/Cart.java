package com.kltech.cart_service.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Table(name = "cart")
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Cart extends BaseEntity {
    private String userId;
    private List<CartItem> items = new ArrayList<>();
    private Double totalPrice;
    private String status;
    private String shippingAddress;
    private Long expirationTime;
}
