package com.kltech.cart_service.models.mappers;

import com.kltech.cart_service.entities.CartItem;
import com.kltech.cart_service.models.requests.CartItemRequest;

public class CartItemMapper {
    
    public static CartItem toEntity(CartItemRequest request) {
        CartItem cartItem = new CartItem();
        cartItem.setCartId(request.getCartId());
        return cartItem;
    }
    
    public static CartItemRequest toRequest(CartItem entity) {
        CartItemRequest cartItemRequest = new CartItemRequest();
        cartItemRequest.setCartId(entity.getCartId());
        return cartItemRequest;
    }
}