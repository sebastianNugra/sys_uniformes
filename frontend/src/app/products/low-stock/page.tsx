import { getLowStockProducts } from "@/services/api";

export default async function LowStockPage() {
  const products =
    await getLowStockProducts();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Productos con Stock Bajo
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">
              Nombre
            </th>
            <th className="p-3 text-left">
              Talla
            </th>
            <th className="p-3 text-left">
              Precio
            </th>
            <th className="p-3 text-left">
              Stock
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: any) => (
            <tr
              key={product.id}
              className="border-t"
            >
              <td className="p-3">
                {product.name}
              </td>
              <td className="p-3">
                {product.size}
              </td>
              <td className="p-3">
                ${product.price}
              </td>
              <td className="p-3">
                {product.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}