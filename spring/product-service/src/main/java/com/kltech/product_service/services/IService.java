package com.kltech.product_service.services;

import java.util.List;

import com.kltech.product_service.entities.BaseEntity;

public interface IService<T extends BaseEntity> {
    public List<T> findAll();
    public T findById(Long id);
    public T create(T t);
    public T update(Long id, T t);
    public T delete(Long id);
}
