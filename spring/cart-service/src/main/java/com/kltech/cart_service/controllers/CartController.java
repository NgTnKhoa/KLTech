package com.kltech.cart_service.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kltech.cart_service.entities.Cart;
import com.kltech.cart_service.interfaces.services.Cart.ICartService;
import com.kltech.cart_service.models.mappers.CartMapper;
import com.kltech.cart_service.models.requests.CartRequest;
import com.kltech.cart_service.models.responses.BaseResponse;

@RestController
@RequestMapping("/api/v1/carts")
public class CartController {
    @Autowired
    protected ICartService cartService;
    
    @GetMapping("/")
    public ResponseEntity<BaseResponse> index() {
        List<Cart> carts = cartService.findAll();
        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .message("Get All Carts Successfully")
                .status(true)
                .data(carts)
                .statusCode(200)
                .build());
    }

    @GetMapping("{id}")
    public ResponseEntity<BaseResponse> show(@PathVariable Long id) {
        Cart cart = cartService.findById(id);
        return ResponseEntity.ok()
            .body(BaseResponse.builder()
                .message("Get cart successfully")
                .status(true)
                .statusCode(200)
                .data(cart)
                .build());
    }
    
    @PostMapping("/")
    public ResponseEntity<BaseResponse> store(@RequestBody CartRequest cartRequest) {
        Cart cart = CartMapper.toEntity(cartRequest);
        Cart created = cartService.create(cart);
        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .data(created)
                .statusCode(201)
                .status(true)
                .build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> update(@PathVariable Long id, @RequestBody CartRequest cartRequest) {
        Cart cart = CartMapper.toEntity(cartRequest);
        Cart record = cartService.findById(id);
        Cart updated = cartService.update(id, cart);

        if(record == null)
            return ResponseEntity
                .badRequest()
                .body(BaseResponse.builder()
                    .data(null)
                    .statusCode(404)
                    .status(false)
                    .message("Not found")
                    .build());

        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .data(updated)
                .statusCode(200)
                .status(true)
                .build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> delete(@PathVariable Long id) throws Exception {
        try {
            cartService.delete(id);
            return ResponseEntity
                .ok()
                .body(BaseResponse.builder()
                    .data(null)
                    .statusCode(200)
                    .status(true)
                    .build());
        }
        catch(Exception e) {
            return ResponseEntity
                .badRequest()
                .body(BaseResponse.builder()
                    .data(null)
                    .statusCode(400)
                    .status(false)
                    .message(e.getMessage())
                    .build());
        }
    }
}