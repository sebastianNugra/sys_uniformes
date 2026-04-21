package com.uniformes.system.model;

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
    
    @NotNull(message = "Total is required")
    private Double total;

    private String paymentMethod;
}