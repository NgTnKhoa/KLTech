package com.kltech.cart_service.implementations.services.Cart;

import org.springframework.beans.factory.annotation.Autowired;

import com.kltech.cart_service.entities.Cart;
import com.kltech.cart_service.implementations.services.BaseService;
import com.kltech.cart_service.interfaces.services.Cart.ICartService;
import com.kltech.cart_service.repositories.CartRepository;

public class CartService extends BaseService<Cart> implements ICartService {
   public CartService(@Autowired CartRepository repository) {
        super(repository);
    }
}
