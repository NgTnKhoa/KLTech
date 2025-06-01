package com.kltech.order_service.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order extends Base {

  @Column(name = "user_id", nullable = false)
  private String userId;

  @Column(name = "amount")
  private double amount;

  @Column(name = "status")
  private String status;

  @Column(name = "address")
  private String address;

  @OneToMany(mappedBy = "order")
  private List<OrderItem> orderItems;

  @OneToOne(mappedBy = "order")
  private Payment payment;
}
