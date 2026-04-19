package com.uniformes.system.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
        return repository.findById(id).orElseThrow();
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}