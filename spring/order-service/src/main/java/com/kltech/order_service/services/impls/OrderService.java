package com.kltech.order_service.services.impls;

import com.kltech.order_service.entities.Order;
import com.kltech.order_service.entities.OrderItem;
import com.kltech.order_service.mappers.OrderItemMapper;
import com.kltech.order_service.mappers.OrderMapper;
import com.kltech.order_service.models.requests.OrderRequest;
import com.kltech.order_service.models.responses.OrderResponse;
import com.kltech.order_service.repositories.OrderItemRepository;
import com.kltech.order_service.repositories.OrderRepository;
import com.kltech.order_service.services.IOrderService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {

  private final OrderMapper orderMapper;
  private final OrderItemMapper orderItemMapper;
  private final OrderRepository orderRepository;
  private final OrderItemRepository orderItemRepository;

  @Override
  public List<OrderResponse> findAll() {
    return orderMapper.toOrderResponses(orderRepository.findAll());
  }

  @Override
  public OrderResponse create(OrderRequest orderRequest) {
    Order order = orderRepository.save(orderMapper.toOrderEntity(orderRequest));
    List<OrderItem> orderItems = orderRequest.getOrderItems().stream()
        .map(itemReq -> {
          OrderItem item = orderItemMapper.toOrderItemEntity(itemReq);
          item.setOrder(order);
          return item;
        })
        .toList();

    order.setOrderItems(orderItems);
    orderItemRepository.saveAll(orderItems);

    return orderMapper.toOrderResponse(order);
  }

  @Override
  public OrderResponse update(String id, OrderRequest orderRequest) {
    Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    return orderMapper.toOrderResponse(
        orderRepository.save(
            orderMapper.toOrderEntity(orderRequest, order)));
  }

  @Override
  public void delete(String id) {
    if (orderRepository.existsById(id)) {
      orderRepository.deleteById(id);
    } else {
      throw new RuntimeException("Order not found");
    }
  }

  @Override
  public OrderResponse findById(String id) {
    return orderRepository.findById(id).map(orderMapper::toOrderResponse).orElseThrow(() -> new RuntimeException("Order not found"));
  }
}
