package com.kltech.order_service.controllers;

import com.kltech.order_service.models.requests.PaymentRequest;
import com.kltech.order_service.models.responses.BaseResponse;
import com.kltech.order_service.models.responses.PaymentResponse;
import com.kltech.order_service.services.IPaymentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

  private final IPaymentService paymentService;

  @GetMapping
  public ResponseEntity<BaseResponse> findAll() {
    List<PaymentResponse> payments = paymentService.findAll();
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .message("Get All Payments Successfully")
            .status(true)
            .data(payments)
            .statusCode(200)
            .build());
  }

  @GetMapping("/{id}")
  public ResponseEntity<BaseResponse> findById(@PathVariable String id) {
    PaymentResponse payment = paymentService.findById(id);
    return ResponseEntity.ok()
        .body(BaseResponse.builder()
            .message("Get payment successfully")
            .status(true)
            .statusCode(200)
            .data(payment)
            .build());
  }

  @PostMapping
  public ResponseEntity<BaseResponse> create(@RequestBody PaymentRequest paymentRequest) {
    PaymentResponse createdPayment = paymentService.create(paymentRequest);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(createdPayment)
            .statusCode(201)
            .status(true)
            .build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<BaseResponse> update(@PathVariable String id, @RequestBody PaymentRequest paymentRequest) {
    PaymentResponse updatedPayment = paymentService.update(id, paymentRequest);

    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(updatedPayment)
            .statusCode(200)
            .status(true)
            .build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<BaseResponse> delete(@PathVariable String id) {
    paymentService.delete(id);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(null)
            .statusCode(200)
            .status(true)
            .build());
  }
}
