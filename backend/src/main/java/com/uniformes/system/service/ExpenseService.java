package com.uniformes.system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uniformes.system.exception.ResourceNotFoundException;
import com.uniformes.system.model.Expense;
import com.uniformes.system.repository.ExpenseRepository;

@Service
public class ExpenseService {

        private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    public Expense createExpense(Expense expense) {
        return repository.save(expense);
    }

    public Expense getExpenseById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
    }

    public void deleteExpense(Long id) {
        repository.deleteById(id);
    }
    
}