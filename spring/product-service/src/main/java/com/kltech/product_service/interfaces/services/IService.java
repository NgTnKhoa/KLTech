package com.kltech.product_service.interfaces.services;

import java.util.List;

import com.kltech.product_service.entities.BaseEntity;

import jakarta.transaction.Transactional;

public interface IService<T extends BaseEntity> {
    public List<T> findAll();
    public T findById(Long id);
    @Transactional
    public T create(T t);
    @Transactional
    public T update(Long id, T t);
    @Transactional
    public T delete(Long id);
}
