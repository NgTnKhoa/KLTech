package com.kltech.order_service.models.responses;

import java.util.List;
import lombok.Data;

@Data
public class OrderResponse {

  private String id;
  private String userId;
  private double amount;
  private String status;
  private String address;
  private List<OrderItemResponse> orderItems;
}
