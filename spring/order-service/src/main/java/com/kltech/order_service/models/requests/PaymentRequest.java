package com.kltech.order_service.models.requests;

import lombok.Data;

@Data
public class PaymentRequest {

  private String status;
  private String method;
  private double amount;
  private String transactionId;
  private String orderId;
}
