package com.uniformes.system.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "sales")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotNull(message = "Total is required")
    private Double total;

    private String paymentMethod;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}