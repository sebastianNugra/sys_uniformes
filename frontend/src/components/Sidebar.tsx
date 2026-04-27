"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/products", label: "Productos" },
    { href: "/sales/new", label: "Venta" },
    { href: "/sales", label: "Historial Ventas" },
    { href: "/expenses", label: "Gastos" },
    { href: "/products/low-stock", label: "Stock Bajo" },
  ];

  return (<aside className="w-56 min-h-screen px-3 py-5 bg-slate-950 border-r border-slate-800 text-slate-200">
    
      <h2 className="text-xl font-semibold mb-8 text-white">
        UniformesSys
      </h2>

      <nav className="flex flex-col gap-2">
        {links.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-4 py-3 rounded-xl text-sm transition
                ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}