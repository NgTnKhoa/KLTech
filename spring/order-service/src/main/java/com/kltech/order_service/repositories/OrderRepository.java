package com.kltech.order_service.repositories;

import com.kltech.order_service.entities.Order;
import com.kltech.order_service.models.responses.OrderResponse;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {

  List<OrderResponse> findAllByUserId(String userId);
}