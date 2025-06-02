package com.kltech.cart_service.entities.listeners;

import com.kltech.cart_service.entities.BaseEntity;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public class AuditEntityListener {

    @PrePersist
    public void prePersist(Object entity) {
        BaseEntity baseEntity = (BaseEntity) entity;
        baseEntity.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        baseEntity.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
    }

    @PreUpdate
    public void preUpdate(Object entity) {
        BaseEntity baseEntity = (BaseEntity) entity;
        baseEntity.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
    }

}
