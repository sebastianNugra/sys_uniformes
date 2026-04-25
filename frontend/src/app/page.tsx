import SummaryCard from "@/components/SummaryCard";
import { getDashboardSummary } from "@/services/api";

export default async function Home() {
  const summary = await getDashboardSummary();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Financiero
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Ventas Totales"
          value={summary.totalSales}
        />

        <SummaryCard
          title="Gastos Totales"
          value={summary.totalExpenses}
        />

        <SummaryCard
          title="Ganancia Neta"
          value={summary.netProfit}
        />
      </div>
    </main>
  );
}