package com.uniformes.system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FinancialSummaryDTO {

    private Double totalSales;

    private Double totalExpenses;
    
    private Double netProfit;

}