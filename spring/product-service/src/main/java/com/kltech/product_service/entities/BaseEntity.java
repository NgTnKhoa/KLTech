package com.kltech.product_service.entities;

import java.sql.Timestamp;

import com.kltech.product_service.entities.listeners.AuditEntityListener;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
@EntityListeners(AuditEntityListener.class)
abstract public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    protected Timestamp createdAt;
    protected Timestamp updatedAt;
    protected Timestamp deletedAt;
}
