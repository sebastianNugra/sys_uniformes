"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  createSale,
} from "@/services/api";

export default function NewSalePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] =
    useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] =
    useState("Efectivo");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
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
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Registrar Venta
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-2">
            Producto
          </label>

          <select
            value={selectedProductId}
            onChange={(e) =>
              setSelectedProductId(
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          >
            <option value="">
              Seleccione producto
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
        </div>

        <div>
          <label className="block mb-2">
            Cantidad
          </label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Number(e.target.value)
              )
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">
            Método de pago
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          >
            <option>Efectivo</option>
            <option>Transferencia</option>
            <option>Tarjeta</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Registrar Venta
        </button>
      </form>
    </main>
  );
}