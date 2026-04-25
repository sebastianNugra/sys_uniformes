package com.uniformes.system.controller;

import org.springframework.web.bind.annotation.*;

import com.uniformes.system.model.Sale;
import com.uniformes.system.service.SaleService;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class SaleController {

    private final SaleService service;

    public SaleController(SaleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Sale> getAllSales() {
        return service.getAllSales();
    }

    @PostMapping
    public Sale createSale(@RequestBody Sale sale) {
        return service.createSale(sale);
    }

    @GetMapping("/{id}")
    public Sale getSaleById(@PathVariable Long id) {
        return service.getSaleById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteSale(@PathVariable Long id) {
        service.deleteSale(id);
    }

    @GetMapping("/summary")
    public Double getTotalSales() {
        return service.getTotalSales();
    }
}