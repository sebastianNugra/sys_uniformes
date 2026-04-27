"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import DeleteButton from "@/components/DeleteButton";
import { getProducts } from "@/services/api";

type Product = {
  id: number;
  name: string;
  size: string;
  price: number;
  stock: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Productos
        </h1>
        <p className="text-slate-400">
          Gestiona tu inventario de productos
        </p>
      </div>

      {/* FORM */}
      <ProductForm
        product={editingProduct || undefined}
        onSuccess={() => {
          setEditingProduct(null);
          loadProducts();
        }}
      />

      {/* TABLE CONTAINER */}
      <div
        className="
          rounded-2xl
          overflow-hidden
          border border-slate-800
          bg-slate-900/60
        "
      >
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-900 text-slate-400 text-sm">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Talla</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="
                  border-t border-slate-800
                  hover:bg-slate-800/40
                  transition
                "
              >
                <td className="p-4 font-medium text-white">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.size}
                </td>

                <td className="p-4 text-slate-200">
                  ${product.price}
                </td>

                <td className="p-4">
                  <span
                    className={` px-3 py-1.5 rounded-xl text-base font-bold inline-flex items-center justify-center min-w-[44px]
                      ${product.stock <= 5
                        ? "bg-rose-500/10 text-rose-400"
                        : "bg-emerald-500/10 text-emerald-400"
                      }
                      `}
                      >
                    {product.stock}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="
                      px-3 py-2
                      rounded-xl
                      bg-slate-800
                      border border-slate-700
                      text-slate-300
                      hover:bg-indigo-500/10
                      hover:text-indigo-300
                      transition
                    "
                  >
                    Editar
                  </button>

                  <DeleteButton id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}