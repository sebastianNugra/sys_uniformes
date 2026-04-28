"use client";

import { deleteProduct } from "@/services/api";

interface DeleteButtonProps {
  id: number;
}

export default function DeleteButton({
  id,
}: DeleteButtonProps) {
  const handleDelete = async () => {
    await deleteProduct(id);
    window.location.reload();
  };

  return (
    <button
      onClick={handleDelete}
      className="
        px-3 py-2
        rounded-xl
        bg-slate-800
        text-rose-400
        border border-slate-700
        hover:bg-rose-500/10
        hover:border-rose-500/30
        hover:text-rose-300
        transition-all
        duration-200
        shadow-sm
      "
    >
      Eliminar
    </button>
  );
}