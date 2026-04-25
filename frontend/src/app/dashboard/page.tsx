"use client";

import { useEffect, useState } from "react";
import {
  getSalesSummary,
  getLowStockCount,
} from "@/services/api";

export default function DashboardPage() {
  const [sales, setSales] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const totalSales = await getSalesSummary();
      const stockAlert = await getLowStockCount();

      setSales(totalSales);
      setLowStock(stockAlert);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Ventas Totales
          </h2>
          <p className="text-3xl mt-2">
            ${sales}
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Productos con Stock Bajo
          </h2>
          <p className="text-3xl mt-2">
            {lowStock}
          </p>
        </div>
      </div>
    </main>
  );
}