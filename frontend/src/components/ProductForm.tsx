"use client";

import { useEffect, useState } from "react";
import {
  createProduct,
  updateProduct,
} from "@/services/api";

interface ProductFormProps {
  product?: {
    id: number;
    name: string;
    size: string;
    price: number;
    stock: number;
  };
  onSuccess?: () => void;
}

export default function ProductForm({
  product,
  onSuccess,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSize(product.size);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      size,
      price: Number(price),
      stock: Number(stock),
    };

    if (product) {
      await updateProduct(product.id, data);
    } else {
      await createProduct(data);
    }

    setName("");
    setSize("");
    setPrice("");
    setStock("");

    if (onSuccess) {
      onSuccess();
    } else {
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Talla"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="border rounded-lg p-3"
      />

      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded-lg p-3"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="border rounded-lg p-3"
      />

      <button
        type="submit"
        className="rounded-lg border p-3"
      >
        {product ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}