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
      className="rounded-lg border px-3 py-2"
    >
      Eliminar
    </button>
  );
}