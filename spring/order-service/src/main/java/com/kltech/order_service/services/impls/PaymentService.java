package com.kltech.order_service.services.impls;

import com.kltech.order_service.entities.Payment;
import com.kltech.order_service.mappers.PaymentMapper;
import com.kltech.order_service.models.requests.PaymentRequest;
import com.kltech.order_service.models.responses.PaymentResponse;
import com.kltech.order_service.repositories.OrderRepository;
import com.kltech.order_service.repositories.PaymentRepository;
import com.kltech.order_service.services.IPaymentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService implements IPaymentService {

  private final PaymentMapper paymentMapper;
  private final PaymentRepository paymentRepository;
  private final OrderRepository orderRepository;

  @Override
  public List<PaymentResponse> findAll() {
    return paymentMapper.toPaymentResponses(paymentRepository.findAll());
  }

  @Override
  public PaymentResponse create(PaymentRequest paymentRequest) {
    if (orderRepository.existsById(paymentRequest.getOrderId())) {
      return paymentMapper.toPaymentResponse(
          paymentRepository.save(
              paymentMapper.toPaymentEntity(paymentRequest)));
    } else {
      throw new RuntimeException("Order not found");
    }
  }

  @Override
  public PaymentResponse update(String id, PaymentRequest paymentRequest) {
    Payment payment = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
    return paymentMapper.toPaymentResponse(
        paymentRepository.save(
            paymentMapper.toPaymentEntity(paymentRequest, payment)));
  }

  @Override
  public void delete(String id) {
    if (paymentRepository.existsById(id)) {
      paymentRepository.deleteById(id);
    } else {
      throw new RuntimeException("Payment not found");
    }
  }

  @Override
  public PaymentResponse findById(String id) {
    return paymentRepository.findById(id).map(paymentMapper::toPaymentResponse).orElseThrow(() -> new RuntimeException("Payment not found"));
  }
}
