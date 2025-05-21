package com.kltech.product_service.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kltech.product_service.entities.Product;
import com.kltech.product_service.implementations.services.product.ProductService;
import com.kltech.product_service.models.mappers.ProductMapper;
import com.kltech.product_service.models.requests.ProductRequest;
import com.kltech.product_service.models.responses.BaseResponse;





@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    protected ProductService productService;
    @GetMapping("/")
    public ResponseEntity<BaseResponse> index() {
        List<Product> products = productService.findAll();
        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .message("Get All Products Successfully")
                .status(true)
                .data(products)
                .statusCode(200)
                .build());
    }

    @GetMapping("{id}")
    public ResponseEntity<BaseResponse> show(@PathVariable Long id) {
        Product product = productService.findById(id);
        return ResponseEntity.ok()
            .body(BaseResponse.builder()
                .message("Get product successfully")
                .status(true)
                .statusCode(200)
                .data(product)
                .build());
    }
    

    @PostMapping("/")
    public ResponseEntity<BaseResponse> store(@RequestBody ProductRequest productRequest) {
        Product product = ProductMapper.toEntity(productRequest);
        Product created = productService.create(product);
        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .data(created)
                .statusCode(201)
                .status(true)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> update(@PathVariable Long id, @RequestBody ProductRequest productRequest) {
        Product product = ProductMapper.toEntity(productRequest);
        Product record = productService.findById(id);
        Product updated = productService.update(id, product);

        if(record == null)
            return ResponseEntity
                .badRequest()
                .body(BaseResponse.builder()
                    .data(null)
                    .statusCode(404)
                    .status(false)
                    .message("Not found")
                    .build());

        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .data(updated)
                .statusCode(200)
                .status(true)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> delete(@PathVariable Long id) throws Exception {
        try {
            productService.delete(id);
            return ResponseEntity
                .ok()
                .body(BaseResponse.builder()
                    .data(null)
                    .statusCode(200)
                    .status(true)
                    .build());
        }
        catch(Exception e) {
            return ResponseEntity
                .badRequest()
                .body(BaseResponse.builder()
                    .data(null)
                    .statusCode(400)
                    .status(false)
                    .message(e.getMessage())
                    .build());
        }
    }
    
}
