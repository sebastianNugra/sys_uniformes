"use client";

import { useEffect, useMemo, useState } from "react";
import { getSales } from "@/services/api";
import ExportExcelButton from "@/components/ExportExcelButton";

type Sale = {
  id: number;
  product: {
    name: string;
  };
  quantity: number;
  total: number;
  paymentMethod: string;
  createdAt: string | null;
};

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    const data = await getSales();
    setSales(data);
  }

  const filteredSales = useMemo(() => {
    const now = new Date();

    return sales
      .filter((sale) => {
        const matchesSearch = sale.product.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesPayment =
          paymentFilter === "" ||
          sale.paymentMethod === paymentFilter;

        let matchesDate = true;

        if (dateFilter && sale.createdAt) {
          const saleDate = new Date(sale.createdAt);

          if (dateFilter === "today") {
            matchesDate =
              saleDate.toDateString() === now.toDateString();
          }

          if (dateFilter === "week") {
            const diff =
              (now.getTime() - saleDate.getTime()) /
              (1000 * 60 * 60 * 24);

            matchesDate = diff >= 0 && diff <= 7;
          }

          if (dateFilter === "month") {
            matchesDate =
              saleDate.getMonth() === now.getMonth() &&
              saleDate.getFullYear() === now.getFullYear();
          }
        }

        return matchesSearch && matchesPayment && matchesDate;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );
  }, [sales, search, paymentFilter, dateFilter]);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedSales = filteredSales.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, paymentFilter, dateFilter]);

  return (
    <main className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Historial de Ventas
        </h1>
        <p className="text-slate-400">
          Consulta y filtra todas las ventas registradas
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between items-center">
        <ExportExcelButton />
      </div>

      {/* FILTERS */}
      <div
        className="
          grid grid-cols-1 md:grid-cols-3 gap-4
          p-4
          rounded-2xl
          bg-slate-900/80
          border border-slate-800
        "
      >
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            bg-slate-800
            border border-slate-700
            text-slate-200
            placeholder:text-slate-500
            rounded-xl
            p-3
            focus:ring-2 focus:ring-indigo-500
            outline-none
          "
        />

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="
            bg-slate-800
            border border-slate-700
            text-slate-200
            rounded-xl
            p-3
          "
        >
          <option value="">Todas las fechas</option>
          <option value="today">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="
            bg-slate-800
            border border-slate-700
            text-slate-200
            rounded-xl
            p-3
          "
        >
          <option value="">Todos</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-slate-400 text-sm">Ventas encontradas</p>
          <p className="text-2xl font-bold">{filteredSales.length}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-slate-400 text-sm">Total filtrado</p>
          <p className="text-2xl font-bold">
            $
            {filteredSales.reduce((sum, s) => sum + s.total, 0)}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-slate-400 text-sm">Página actual</p>
          <p className="text-2xl font-bold">{currentPage}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl overflow-hidden border border-slate-800">
        <table className="w-full text-center">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Total</th>
              <th className="p-3">Método</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>

          <tbody className="bg-slate-950 text-slate-300">
            {paginatedSales.map((sale) => (
              <tr
                key={sale.id}
                className="border-t border-slate-800 hover:bg-slate-900/50 transition"
              >
                <td className="p-3">{sale.product.name}</td>
                <td className="p-3">{sale.quantity}</td>
                <td className="p-3">${sale.total}</td>
                <td className="p-3">{sale.paymentMethod}</td>
                <td className="p-3">
                  {sale.createdAt
                    ? new Date(sale.createdAt).toLocaleDateString("es-EC")
                    : "Sin fecha"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="text-slate-400">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}