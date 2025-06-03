package com.kltech.product_service.services.impls;

import com.kltech.product_service.entities.Product;
import com.kltech.product_service.mappers.ProductMapper;
import com.kltech.product_service.models.requests.ProductRequest;
import com.kltech.product_service.models.responses.ProductResponse;
import com.kltech.product_service.repositories.ProductRepository;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.kltech.product_service.services.IProductService;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

  private final ProductMapper productMapper;
  private final ProductRepository productRepository;

  @Override
  public List<ProductResponse> findAll() {
    return productRepository.findAll().stream().map(productMapper::toProductResponse).toList();
  }

  @Override
  public ProductResponse create(ProductRequest productRequest) {
    return productMapper.toProductResponse(
        productRepository.save(
            productMapper.toProductEntity(productRequest)));
  }

  @Override
  public ProductResponse update(String id, ProductRequest productRequest) {
    Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    return productMapper.toProductResponse(
        productRepository.save(
            productMapper.toProductEntity(productRequest, product)));
  }

  @Override
  public void delete(String id) {
    if (productRepository.existsById(id)) {
      productRepository.deleteById(id);
    } else {
      throw new RuntimeException("Product not found");
    }
  }

  @Override
  public ProductResponse findById(String id) {
    return productRepository.findById(id).map(productMapper::toProductResponse).orElseThrow(() -> new RuntimeException("Product not found"));
  }

  @Override
  public List<ProductResponse> findByCategoryId(String categoryId) {
    return productRepository.findAllByCategory_Id(categoryId).stream().map(productMapper::toProductResponse).toList();
  }

  @Override
  public List<ProductResponse> findAllFeaturedProducts() {
    return productRepository.findAll().stream().filter(Product::isFeatured).map(productMapper::toProductResponse).toList();
  }
}
