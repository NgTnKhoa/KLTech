package com.kltech.product_service.repositories;

import com.kltech.product_service.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, String> {

}