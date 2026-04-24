package com.uniformes.system.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniformes.system.model.Expenses;

@Repository
public interface ExpenseRepository extends JpaRepository<Expenses, Long> {
    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expenses e")
    Double getTotalExpenses();
}
