package com.uniformes.system.service;

import org.springframework.stereotype.Service;
import com.uniformes.system.exception.ResourceNotFoundException;
import com.uniformes.system.model.Sale;
import com.uniformes.system.repository.SaleRepository;

import java.util.List;


@Service
public class SaleService {

    private final SaleRepository repository;

    public SaleService(SaleRepository repository) {
        this.repository = repository;
    }

    public List<Sale> getAllSales() {
        return repository.findAll();
    }

    public Sale createSale(Sale sale) {
        return repository.save(sale);
    }

    public Sale getSaleById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found"));
    }

    public void deleteSale(Long id) {
        repository.deleteById(id);
    }
}