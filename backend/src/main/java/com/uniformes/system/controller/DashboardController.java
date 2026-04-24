package com.uniformes.system.controller;

import org.springframework.web.bind.annotation.*;

import com.uniformes.system.dto.FinancialSummaryDTO;
import com.uniformes.system.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/summary")
    public FinancialSummaryDTO getSummary() {
        return service.getFinancialSummary();
    }
}