package com.kltech.cart_service.models.mappers;

import com.kltech.cart_service.entities.Cart;
import com.kltech.cart_service.models.requests.CartRequest;

public class CartMapper {
    
    public static Cart toEntity(CartRequest request) {
        Cart cart = new Cart();
        cart.setItems(request.getItems());
        return cart;
    }
    
    public static CartRequest toRequest(Cart entity) {
        CartRequest cartRequest = new CartRequest();
        cartRequest.setItems(entity.getItems());
        return cartRequest;
    }
}