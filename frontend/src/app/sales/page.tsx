import { getSales } from "@/services/api";

export default async function SalesPage() {
  const sales = await getSales();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Historial de Ventas
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Cantidad</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Método</th>
              <th className="p-3 text-left">Fecha</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale: any) => (
              <tr key={sale.id} className="border-t">
                <td className="p-3">
                  {sale.product.name}
                </td>

                <td className="p-3">
                  {sale.quantity}
                </td>

                <td className="p-3">
                  ${sale.total}
                </td>

                <td className="p-3">
                  {sale.paymentMethod}
                </td>

                <td className="p-3">
                  {sale.createdAt
                    ? new Date(
                        sale.createdAt
                      ).toLocaleString()
                    : "Sin fecha"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}