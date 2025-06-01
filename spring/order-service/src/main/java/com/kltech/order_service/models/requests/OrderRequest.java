package com.kltech.order_service.models.requests;

import java.util.List;
import lombok.Data;

@Data
public class OrderRequest {

  private String userId;
  private double amount;
  private String status;
  private String address;
  private List<OrderItemRequest> orderItems;
}
