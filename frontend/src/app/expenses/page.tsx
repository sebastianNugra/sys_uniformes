"use client";

import { useState } from "react";
import { createExpense } from "@/services/api";

export default function ExpensesPage() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    await createExpense({
      description,
      amount: Number(amount),
    });

    alert("Gasto registrado");

    setDescription("");
    setAmount("");
  };

  return (
    <main className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Registrar Gasto
        </h1>
        <p className="text-slate-400">
          Añade nuevos gastos al sistema
        </p>
      </div>

      {/* FORM CARD */}
      <div
        className="
          max-w-md
          p-6
          rounded-2xl
          bg-slate-900/80
          border border-slate-800
          shadow-lg
          space-y-4
        "
      >
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full
            bg-slate-800
            border border-slate-700
            text-slate-200
            placeholder:text-slate-500
            rounded-xl
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            transition
          "
        />

        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="
            w-full
            bg-slate-800
            border border-slate-700
            text-slate-200
            placeholder:text-slate-500
            rounded-xl
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            transition
          "
        />

        <button
          onClick={handleSubmit}
          className="
            w-full
            rounded-xl
            bg-indigo-500
            hover:bg-indigo-600
            text-white
            font-medium
            py-3
            transition
            shadow-md
            hover:shadow-lg
          "
        >
          Guardar gasto
        </button>
      </div>
    </main>
  );
}