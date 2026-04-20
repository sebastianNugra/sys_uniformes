package com.uniformes.system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.uniformes.system.model.Expense;
import com.uniformes.system.service.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin("*")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return service.getAllExpenses();
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        return service.createExpense(expense);
    }

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return service.getExpenseById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        service.deleteExpense(id);
    }

}