package com.kltech.order_service.controllers;

import com.kltech.order_service.models.responses.BaseResponse;
import com.kltech.order_service.models.responses.OrderResponse;
import com.kltech.order_service.services.IOrderService;
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

import com.kltech.order_service.models.requests.OrderRequest;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

  private final IOrderService orderService;

  @GetMapping
  public ResponseEntity<BaseResponse> findAll() {
    List<OrderResponse> orders = orderService.findAll();
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .message("Get All Orders Successfully")
            .status(true)
            .data(orders)
            .statusCode(200)
            .build());
  }

  @GetMapping("/{id}")
  public ResponseEntity<BaseResponse> findById(@PathVariable String id) {
    OrderResponse order = orderService.findById(id);
    return ResponseEntity.ok()
        .body(BaseResponse.builder()
            .message("Get order successfully")
            .status(true)
            .statusCode(200)
            .data(order)
            .build());
  }

  @PostMapping
  public ResponseEntity<BaseResponse> create(@RequestBody OrderRequest orderRequest) {
    OrderResponse createdOrder = orderService.create(orderRequest);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(createdOrder)
            .statusCode(201)
            .status(true)
            .build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<BaseResponse> update(@PathVariable String id, @RequestBody OrderRequest orderRequest) {
    OrderResponse updatedOrder = orderService.update(id, orderRequest);

    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(updatedOrder)
            .statusCode(200)
            .status(true)
            .build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<BaseResponse> delete(@PathVariable String id) {
    orderService.delete(id);
    return ResponseEntity
        .ok()
        .body(BaseResponse.builder()
            .data(null)
            .statusCode(200)
            .status(true)
            .build());
  }
}
