import SummaryCard from "@/components/SummaryCard";
import SalesChart from "@/components/SalesChart";
import {
  getSalesSummary,
  getSales,
  getLowStockCount,
} from "@/services/api";

export default async function Home() {
  const summary = await getSalesSummary();
  const sales = await getSales();
  const lowStock = await getLowStockCount();

  return (
    <main className="p-8 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Financiero
        </h1>
        <p className="text-slate-400 mt-1">
          Resumen general del negocio
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Ventas Totales"
          value={summary.totalSales}
          variant="blue"
        />

        <SummaryCard
          title="Gastos Totales"
          value={summary.totalExpenses}
          variant="red"
        />

        <SummaryCard
          title="Ganancia Neta"
          value={summary.netProfit}
          variant="green"
        />

        <SummaryCard
          title="Stock Bajo"
          value={lowStock}
          variant="purple"
          isCurrency={false}
        />
      </div>

      {/* Chart section */}
      <div
        className="
          rounded-2xl
          p-6
          bg-slate-900/80
          border border-slate-800
          shadow-lg
        "
      >
        <h2 className="text-lg font-semibold text-slate-200 mb-4">
          Análisis de Ventas
        </h2>

        <SalesChart sales={sales} />
      </div>
    </main>
  );
}