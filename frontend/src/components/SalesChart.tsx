"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Sale = {
  paymentMethod: string;
  total: number;
};

type Props = {
  sales: Sale[];
};

export default function SalesChart({
  sales,
}: Props) {
  const chartData = [
    {
      method: "Efectivo",
      total: sales
        .filter((s) => s.paymentMethod === "Efectivo")
        .reduce((sum, s) => sum + s.total, 0),
    },
    {
      method: "Transferencia",
      total: sales
        .filter((s) => s.paymentMethod === "Transferencia")
        .reduce((sum, s) => sum + s.total, 0),
    },
    {
      method: "Tarjeta",
      total: sales
        .filter((s) => s.paymentMethod === "Tarjeta")
        .reduce((sum, s) => sum + s.total, 0),
    },
  ];

  return (
    <div
      className="
        rounded-2xl
        p-6
        bg-slate-900/80
        backdrop-blur-md
        border border-slate-700
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-300
        max-w-3xl
      "
    >
      <h2 className="text-lg font-semibold text-slate-200 mb-4">
        Ventas por Método
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="rgba(148,163,184,0.1)" />

          <XAxis
            dataKey="method"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              color: "#e2e8f0",
            }}
          />

          <Bar
            dataKey="total"
            fill="#6366f1" // indigo-500
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}