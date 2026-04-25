package com.uniformes.system.repository;

import com.uniformes.system.model.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT COUNT(p) FROM Product p WHERE p.stock <= 3")
    Long getLowStockCount();

    List<Product> findByStockLessThanEqual(Integer stock);
}
