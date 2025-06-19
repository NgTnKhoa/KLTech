package com.kltech.order_service.models.responses;

import com.kltech.order_service.entities.OrderItem;
import java.util.List;
import lombok.Data;

@Data
public class OrderItemResponse {

  private String id;
  private String productId;
  private String orderId;
  private int quantity;
  private double price;
  private double amount;
}
