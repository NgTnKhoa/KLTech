package com.kltech.order_service.services;

import com.kltech.order_service.models.requests.OrderRequest;
import com.kltech.order_service.models.responses.OrderResponse;
import jakarta.transaction.Transactional;
import java.util.List;

public interface IOrderService {

  List<OrderResponse> findAll();

  @Transactional
  OrderResponse create(OrderRequest orderRequest);

  @Transactional
  OrderResponse update(String id, OrderRequest orderRequest);

  @Transactional
  void delete(String id);

  @Transactional
  OrderResponse findById(String id);
}
