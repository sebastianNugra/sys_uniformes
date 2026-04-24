import { getProducts } from "@/services/api";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Productos
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Talla</th>
              <th className="p-4 text-left">Precio</th>
              <th className="p-4 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.size}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}