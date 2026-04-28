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
      className="
        mb-8
        grid grid-cols-1 md:grid-cols-5
        gap-4
        p-6
        rounded-2xl
        bg-slate-900/80
        border border-slate-700
        shadow-lg
      "
    >
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="
          bg-slate-800
          border border-slate-700
          text-slate-200
          placeholder:text-slate-500
          rounded-xl
          p-3
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          transition
        "
      />

      <input
        type="text"
        placeholder="Talla"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="
          bg-slate-800
          border border-slate-700
          text-slate-200
          placeholder:text-slate-500
          rounded-xl
          p-3
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          transition
        "
      />

      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="
          bg-slate-800
          border border-slate-700
          text-slate-200
          placeholder:text-slate-500
          rounded-xl
          p-3
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          transition
        "
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="
          bg-slate-800
          border border-slate-700
          text-slate-200
          placeholder:text-slate-500
          rounded-xl
          p-3
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          transition
        "
      />

      <button
        type="submit"
        className="
          rounded-xl
          bg-indigo-500
          hover:bg-indigo-600
          text-white
          font-medium
          p-3
          transition-all
          duration-200
          shadow-md
          hover:shadow-lg
        "
      >
        {product ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}