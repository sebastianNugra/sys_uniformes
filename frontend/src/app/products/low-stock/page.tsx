import { getLowStockProducts } from "@/services/api";

export default async function LowStockPage() {
  const products = await getLowStockProducts();

  return (
    <main className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Productos con Stock Bajo
        </h1>
        <p className="text-slate-400">
          Estos productos requieren reposición
        </p>
      </div>

      {/* TABLE */}
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
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
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
                    className="
                      px-3 py-1.5
                      rounded-xl
                      text-base
                      font-bold
                      inline-flex
                      items-center
                      justify-center
                      min-w-[44px]
                      bg-rose-500/10
                      text-rose-400
                    "
                  >
                    {product.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}