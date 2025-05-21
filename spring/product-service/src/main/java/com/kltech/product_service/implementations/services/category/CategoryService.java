package com.kltech.product_service.implementations.services.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kltech.product_service.entities.Category;
import com.kltech.product_service.implementations.services.BaseService;
import com.kltech.product_service.interfaces.services.category.ICategoryService;
import com.kltech.product_service.repositories.CategoryRepository;
@Service
public class CategoryService extends BaseService<Category> implements ICategoryService {

    public CategoryService(@Autowired CategoryRepository repository) {
        super(repository);
    }

}
