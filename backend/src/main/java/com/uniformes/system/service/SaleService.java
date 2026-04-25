package com.uniformes.system.service;

import org.springframework.stereotype.Service;
import com.uniformes.system.exception.ResourceNotFoundException;
import com.uniformes.system.model.Product;
import com.uniformes.system.model.Sale;
import com.uniformes.system.repository.SaleRepository;
import com.uniformes.system.repository.ProductRepository;

import java.util.List;

@Service
public class SaleService {

    private final SaleRepository repository;
    private final ProductRepository productRepository;

    public SaleService(
            SaleRepository repository,
            ProductRepository productRepository) {
        this.repository = repository;
        this.productRepository = productRepository;
    }

    public List<Sale> getAllSales() {
        return repository.findAll();
    }

    public Sale createSale(Sale sale) {
        Product product = sale.getProduct();

        if (product.getStock() < sale.getQuantity()) {
            throw new RuntimeException("Not enough stock");
        }

        product.setStock(
                product.getStock() - sale.getQuantity());

        productRepository.save(product);

        double total = product.getPrice() * sale.getQuantity();

        sale.setTotal(total);

        return repository.save(sale);
    }

    public Sale getSaleById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found"));
    }

    public void deleteSale(Long id) {
        repository.deleteById(id);
    }

    public Double getTotalSales() {
        return repository.getTotalSales();
    }
}