package com.kltech.order_service.services;

import com.kltech.order_service.models.requests.PaymentRequest;
import com.kltech.order_service.models.responses.PaymentResponse;
import jakarta.transaction.Transactional;
import java.util.List;

public interface IPaymentService {

  List<PaymentResponse> findAll();

  @Transactional
  PaymentResponse create(PaymentRequest paymentRequest);

  @Transactional
  PaymentResponse update(String id, PaymentRequest paymentRequest);

  @Transactional
  void delete(String id);

  @Transactional
  PaymentResponse findById(String id);
}
