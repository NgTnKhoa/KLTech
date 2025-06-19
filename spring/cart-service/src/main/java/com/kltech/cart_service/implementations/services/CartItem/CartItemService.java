package com.kltech.cart_service.implementations.services.CartItem;

import org.springframework.beans.factory.annotation.Autowired;

import com.kltech.cart_service.entities.CartItem;
import com.kltech.cart_service.implementations.services.BaseService;
import com.kltech.cart_service.interfaces.services.CartItem.ICartItemService;
import com.kltech.cart_service.repositories.CartItemRepository;

public class CartItemService extends BaseService<CartItem> implements ICartItemService {
   public CartItemService(@Autowired CartItemRepository repository) {
        super(repository);
    }
}
