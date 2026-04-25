package com.uniformes.system.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import com.uniformes.system.exception.ResourceNotFoundException;
import com.uniformes.system.model.*;
import com.uniformes.system.repository.*;

import java.io.*;
import java.time.LocalDateTime;
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

        product.setStock(product.getStock() - sale.getQuantity());
        productRepository.save(product);

        double total = product.getPrice() * sale.getQuantity();
        sale.setTotal(total);
        sale.setCreatedAt(LocalDateTime.now());

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

    public ByteArrayInputStream exportSalesToExcel() throws IOException {
        List<Sale> sales = repository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Ventas");

        CreationHelper createHelper = workbook.getCreationHelper();

        // =========================
        // ESTILOS
        // =========================

        // Header
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.LEFT);

        // Base izquierda
        CellStyle leftStyle = workbook.createCellStyle();
        leftStyle.setAlignment(HorizontalAlignment.LEFT);

        // Fecha izquierda
        CellStyle dateLeftStyle = workbook.createCellStyle();
        dateLeftStyle.setDataFormat(
                createHelper.createDataFormat().getFormat("dd/MM/yyyy HH:mm"));
        dateLeftStyle.setAlignment(HorizontalAlignment.LEFT);

        // Dinero izquierda
        CellStyle moneyLeftStyle = workbook.createCellStyle();
        moneyLeftStyle.setDataFormat(
                createHelper.createDataFormat().getFormat("$#,##0.00"));
        moneyLeftStyle.setAlignment(HorizontalAlignment.LEFT);

        // =========================
        // HEADER
        // =========================
        Row headerRow = sheet.createRow(0);

        String[] headers = {
                "ID", "Producto", "Cantidad", "Total", "Método de pago", "Fecha"
        };

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // =========================
        // DATA
        // =========================
        int rowIdx = 1;

        for (Sale sale : sales) {
            Row row = sheet.createRow(rowIdx++);

            Cell c0 = row.createCell(0);
            c0.setCellValue(sale.getId());
            c0.setCellStyle(leftStyle);

            Cell c1 = row.createCell(1);
            c1.setCellValue(sale.getProduct().getName());
            c1.setCellStyle(leftStyle);

            Cell c2 = row.createCell(2);
            c2.setCellValue(sale.getQuantity());
            c2.setCellStyle(leftStyle);

            Cell c3 = row.createCell(3);
            c3.setCellValue(sale.getTotal());
            c3.setCellStyle(moneyLeftStyle);

            Cell c4 = row.createCell(4);
            c4.setCellValue(sale.getPaymentMethod());
            c4.setCellStyle(leftStyle);

            if (sale.getCreatedAt() != null) {
                Cell c5 = row.createCell(5);
                c5.setCellValue(
                        java.sql.Timestamp.valueOf(sale.getCreatedAt()));
                c5.setCellStyle(dateLeftStyle);
            }
        }

        // =========================
        // AJUSTES VISUALES
        // =========================

        // Auto tamaño base
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Ajustes finos por columna
        sheet.setColumnWidth(0, sheet.getColumnWidth(0) + 600);   // ID
        sheet.setColumnWidth(1, sheet.getColumnWidth(1) + 1800);  // Producto
        sheet.setColumnWidth(2, sheet.getColumnWidth(2) + 1000);  // Cantidad
        sheet.setColumnWidth(3, sheet.getColumnWidth(3) + 1000);  // Total
        sheet.setColumnWidth(4, sheet.getColumnWidth(4) + 1500);  // Método de pago
        sheet.setColumnWidth(5, sheet.getColumnWidth(5) + 1500);  // Fecha

        // Filtros
        sheet.setAutoFilter(new CellRangeAddress(0, rowIdx - 1, 0, headers.length - 1));

        // Congelar header
        sheet.createFreezePane(0, 1);

        // =========================
        // EXPORT
        // =========================
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}