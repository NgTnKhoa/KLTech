package com.kltech.order_service.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payments")
public class Payment extends Base {

  @Column(name = "status")
  private String status;

  @Column(name = "method")
  private String method;

  @Column(name = "amount")
  private String amount;

  @Column(name = "transaction_id")
  private String transactionId;

  @OneToOne
  @JoinColumn(name = "order_id")
  private Order order;
}
