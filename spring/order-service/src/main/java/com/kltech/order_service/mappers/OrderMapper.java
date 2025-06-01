package com.kltech.order_service.mappers;

import com.kltech.order_service.entities.Order;
import com.kltech.order_service.models.requests.OrderRequest;
import com.kltech.order_service.models.responses.OrderResponse;
import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", uses = {OrderItemMapper.class})
public interface OrderMapper {

    @Mapping(source = "orderItems", target = "orderItems")
    OrderResponse toOrderResponse(Order order);

    @Mapping(source = "orderItems", target = "orderItems")
    Order toOrderEntity(OrderRequest orderRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Order toOrderEntity(OrderRequest orderRequest, @MappingTarget Order order);

    List<OrderResponse> toOrderResponses(List<Order> orders);
}
