"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import DeleteButton from "@/components/DeleteButton";
import { getProducts } from "@/services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Productos
      </h1>

      <ProductForm
        product={editingProduct}
        onSuccess={() => {
          setEditingProduct(null);
          loadProducts();
        }}
      />

      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Talla</th>
              <th className="p-4 text-left">Precio</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.size}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() =>
                      setEditingProduct(product)
                    }
                    className="rounded-lg border px-3 py-2"
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