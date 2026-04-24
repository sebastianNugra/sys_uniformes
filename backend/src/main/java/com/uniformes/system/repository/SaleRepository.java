package com.uniformes.system.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniformes.system.model.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Query("SELECT COALESCE(SUM(s.total), 0) FROM Sale s")
    Double getTotalSales();
}