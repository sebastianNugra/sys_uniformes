"use client";

import { useEffect, useState } from "react";
import { createSale, getProducts } from "@/services/api";

export default function SalesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] =
    useState("");
  const [quantity, setQuantity] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("Efectivo");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleSale = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const product = products.find(
      (p) => p.id === Number(selectedProductId)
    );

    if (!product) return;

    await createSale({
      product,
      quantity: Number(quantity),
      paymentMethod,
    });

    alert("Venta registrada correctamente");

    setSelectedProductId("");
    setQuantity("");
    setPaymentMethod("Efectivo");

    loadProducts();
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Registrar Venta
      </h1>

      <form
        onSubmit={handleSale}
        className="grid gap-4 max-w-md"
      >
        <select
          value={selectedProductId}
          onChange={(e) =>
            setSelectedProductId(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="">
            Selecciona producto
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name} - Stock:{" "}
              {product.stock}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
          className="border rounded-lg p-3"
        />

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option>Efectivo</option>
          <option>Transferencia</option>
        </select>

        <button
          type="submit"
          className="rounded-lg border p-3"
        >
          Vender
        </button>
      </form>
    </main>
  );
}