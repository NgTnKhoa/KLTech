package com.kltech.order_service.models.responses;

import lombok.Data;

@Data
public class PaymentResponse {

  private String id;
  private String status;
  private String method;
  private double amount;
  private String transactionId;
  private String orderId;
}
