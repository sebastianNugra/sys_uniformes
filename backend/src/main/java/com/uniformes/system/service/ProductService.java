package com.uniformes.system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uniformes.system.exception.ResourceNotFoundException;
import com.uniformes.system.model.Product;
import com.uniformes.system.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product createProduct(Product product) {
        return repository.save(product);
    }

    public Product getProductById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setSize(updatedProduct.getSize());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStock(updatedProduct.getStock());

        return repository.save(existingProduct);
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }

    public Long getLowStockCount() {
        return repository.getLowStockCount();
    }

    public List<Product> getLowStockProducts() {
        return repository.findByStockLessThanEqual(3);
    }
}