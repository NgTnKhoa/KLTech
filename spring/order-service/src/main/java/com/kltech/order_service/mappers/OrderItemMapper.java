package com.kltech.order_service.mappers;

import com.kltech.order_service.entities.OrderItem;
import com.kltech.order_service.models.requests.OrderItemRequest;
import com.kltech.order_service.models.responses.OrderItemResponse;
import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {

  @Mapping(source = "order.id", target = "orderId")
  OrderItemResponse toOrderItemResponse(OrderItem orderItem);

  OrderItem toOrderItemEntity(OrderItemRequest orderItemRequest);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  OrderItem toOrderItemEntity(OrderItemRequest orderItemRequest, @MappingTarget OrderItem orderItem);

  List<OrderItem> toOrderItemEntities(List<OrderItemRequest> orderItemRequests);

  List<OrderItemResponse> toOrderItemResponses(List<OrderItem> orderItems);
}
