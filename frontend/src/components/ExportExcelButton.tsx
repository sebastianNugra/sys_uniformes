"use client";

import { exportSalesExcel } from "@/services/api";

export default function ExportExcelButton() {
  async function handleExport() {
    try {
      await exportSalesExcel();
    } catch (error) {
      alert("Error al exportar Excel");
    }
  }

  return (
    <button
      onClick={handleExport}
      className="
        inline-flex
        items-center
        gap-2
        px-4 py-2.5
        rounded-xl
        bg-slate-800
        text-slate-200
        border border-slate-700
        hover:bg-slate-700
        hover:text-white
        transition-all
        duration-200
        shadow-sm
        hover:shadow-md
      "
    >
      Exportar Excel
    </button>
  );
}