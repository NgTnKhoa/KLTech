package com.kltech.order_service.mappers;

import com.kltech.order_service.entities.Payment;
import com.kltech.order_service.models.requests.PaymentRequest;
import com.kltech.order_service.models.responses.PaymentResponse;
import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(source = "order.id", target = "orderId")
    PaymentResponse toPaymentResponse(Payment payment);

    @Mapping(source = "orderId", target = "order.id")
    Payment toPaymentEntity(PaymentRequest paymentRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Payment toPaymentEntity(PaymentRequest paymentRequest, @MappingTarget Payment payment);

    List<PaymentResponse> toPaymentResponses(List<Payment> payments);
}
