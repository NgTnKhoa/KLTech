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

import com.kltech.product_service.entities.Category;
import com.kltech.product_service.interfaces.services.category.ICategoryService;
import com.kltech.product_service.models.mappers.CategoryMapper;
import com.kltech.product_service.models.requests.CategoryRequest;
import com.kltech.product_service.models.responses.BaseResponse;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    @Autowired
    protected ICategoryService categoryService;
    
    @GetMapping("/")
    public ResponseEntity<BaseResponse> index() {
        List<Category> categories = categoryService.findAll();
        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .message("Get All Categories Successfully")
                .status(true)
                .data(categories)
                .statusCode(200)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> show(@PathVariable Long id) {
        Category category = categoryService.findById(id);
        if(category == null)
            return ResponseEntity
                .status(404)
                .body(BaseResponse.builder()
                    .data(null)
                    .statusCode(404)
                    .status(false)
                    .message("Not found")
                    .build());

        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .message("Get category successfully")
                .status(true)
                .statusCode(200)
                .data(categoryService.findById(id))
                .build());
    }
    
    @PostMapping("/")
    public ResponseEntity<BaseResponse> store(@RequestBody CategoryRequest request) {
        Category category = CategoryMapper.toEntity(request);
        Category created = categoryService.create(category);
        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .data(created)
                .statusCode(201)
                .status(true)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> update(@PathVariable Long id, @RequestBody CategoryRequest request) {
        Category category = CategoryMapper.toEntity(request);
        Category updated = categoryService.update(id, category);
        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .data(updated)
                .statusCode(200)
                .status(true)
                .build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity
            .ok()
            .body(BaseResponse.builder()
                .data(null)
                .statusCode(200)
                .status(true)
                .build());
    }
}
