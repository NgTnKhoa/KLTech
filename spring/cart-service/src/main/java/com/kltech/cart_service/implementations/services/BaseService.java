package com.kltech.cart_service.implementations.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kltech.cart_service.entities.BaseEntity;
import com.kltech.cart_service.interfaces.services.IService;

public class BaseService <T extends BaseEntity> implements IService <T> {
    protected JpaRepository<T, Long> repository;

    public BaseService(JpaRepository<T, Long> repository) {
      this.repository = repository;
    }
    
    @Override
    public List<T> findAll() {
        return repository.findAll();
    }

    @Override
    public T findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public T create(T t) {
        return repository.save(t);
    }

    @Override
    public T update(Long id, T t) {
        t.setId(id);
        return repository.save(t);
    }

    @Override
    public T delete(Long id) {
        T t = repository.findById(id).orElse(null);
        if (t != null) {
            repository.delete(t);
        }
        return t;
    }
}
