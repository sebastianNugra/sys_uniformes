package com.uniformes.system.service;

import org.springframework.stereotype.Service;

import com.uniformes.system.dto.FinancialSummaryDTO;
import com.uniformes.system.repository.ExpenseRepository;
import com.uniformes.system.repository.SaleRepository;

@Service
public class DashboardService {

    private final SaleRepository saleRepository;
    private final ExpenseRepository expenseRepository;

    public DashboardService(SaleRepository saleRepository,
                            ExpenseRepository expenseRepository) {
        this.saleRepository = saleRepository;
        this.expenseRepository = expenseRepository;
    }

    public FinancialSummaryDTO getFinancialSummary() {
        Double totalSales = saleRepository.getTotalSales();
        Double totalExpenses = expenseRepository.getTotalExpenses();
        Double netProfit = totalSales - totalExpenses;

        return new FinancialSummaryDTO(
                totalSales,
                totalExpenses,
                netProfit
        );
    }
}