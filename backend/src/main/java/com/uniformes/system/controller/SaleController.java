package com.uniformes.system.controller;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpHeaders;
import com.uniformes.system.model.Sale;
import com.uniformes.system.service.SaleService;
import org.springframework.http.MediaType;

import java.io.ByteArrayInputStream;
import java.io.IOException;
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

    @GetMapping("/export")
    public ResponseEntity<InputStreamResource> exportSales()
            throws IOException {

        ByteArrayInputStream file = service.exportSalesToExcel();

        HttpHeaders headers = new HttpHeaders();
        headers.add(
                "Content-Disposition",
                "attachment; filename=ventas.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(
                        MediaType.parseMediaType(
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(file));
    }
}