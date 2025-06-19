package com.kltech.cart_service.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kltech.cart_service.interfaces.services.CartItem.ICartItemService;

@RestController
@RequestMapping("/api/v1/cartItems")
public class CartItemController {
    @Autowired
    protected ICartItemService cartItemService;
    
}
