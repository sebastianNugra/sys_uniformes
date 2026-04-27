"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  createSale,
} from "@/services/api";

export default function NewSalePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const product = products.find(
      (p) => p.id === Number(selectedProductId)
    );

    if (!product) {
      alert("Seleccione un producto");
      return;
    }

    await createSale({
      product,
      quantity,
      paymentMethod,
    });

    alert("Venta registrada con éxito");

    setSelectedProductId("");
    setQuantity(1);
    setPaymentMethod("Efectivo");

    loadProducts();
  }

  return (
    <main className="space-y-6 max-w-lg mx-auto">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Registrar Venta
        </h1>
        <p className="text-slate-400">
          Selecciona productos y genera una venta
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="
          space-y-4
          p-6
          rounded-2xl
          bg-slate-900/80
          border border-slate-800
          shadow-lg
        "
      >
        {/* PRODUCT */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Producto
          </label>

          <select
            value={selectedProductId}
            onChange={(e) =>
              setSelectedProductId(e.target.value)
            }
            className="
              w-full
              bg-slate-800
              border border-slate-700
              text-slate-200
              rounded-xl
              p-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          >
            <option value="">Seleccione producto</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} — Stock: {product.stock}
              </option>
            ))}
          </select>
        </div>

        {/* QUANTITY */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Cantidad
          </label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="
              w-full
              bg-slate-800
              border border-slate-700
              text-slate-200
              rounded-xl
              p-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />
        </div>

        {/* PAYMENT */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Método de pago
          </label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="
              w-full
              bg-slate-800
              border border-slate-700
              text-slate-200
              rounded-xl
              p-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          >
            <option>Efectivo</option>
            <option>Transferencia</option>
            <option>Tarjeta</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full
            rounded-xl
            bg-indigo-500
            hover:bg-indigo-600
            text-white
            font-medium
            py-3
            transition
            shadow-md
            hover:shadow-lg
          "
        >
          Registrar Venta
        </button>
      </form>
    </main>
  );
}