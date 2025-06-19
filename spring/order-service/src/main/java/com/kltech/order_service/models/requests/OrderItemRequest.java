package com.kltech.order_service.models.requests;

import com.kltech.order_service.entities.OrderItem;
import java.util.List;
import lombok.Data;

@Data
public class OrderItemRequest {

  private String productId;
  private int quantity;
  private double price;
  private double amount;
}
