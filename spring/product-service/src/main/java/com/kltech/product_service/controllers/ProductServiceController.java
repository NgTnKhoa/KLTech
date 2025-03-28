package com.kltech.product_service.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kltech.product_service.models.response.BaseResponse;


@RestController
@RequestMapping("/api/v1/products")
public class ProductServiceController {
    @GetMapping("/")
    public ResponseEntity<BaseResponse> getProducts() {
        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .message("Get All Products Successfully")
                .status(true)
                .statusCode(200)
                .build());
    }
    
}
