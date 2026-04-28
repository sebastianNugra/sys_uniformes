type SummaryCardProps = {
  title: string;
  value: number;
  isCurrency?: boolean;
  variant?: "blue" | "green" | "purple" | "red";
};

export default function SummaryCard({
  title,
  value,
  isCurrency = true,
  variant = "purple",
}: SummaryCardProps) {
  const variantStyles = {
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-emerald-500/10 text-emerald-400",
    purple: "bg-violet-500/10 text-violet-400",
    red: "bg-rose-500/10 text-rose-400",
  };

  return (
    <div
      className="
        relative
        rounded-2xl
        p-6
        bg-slate-900/80
        backdrop-blur-md
        border border-slate-700
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      {/* acento decorativo sutil */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-6 translate-x-6"></div>

      <h2 className="text-sm text-slate-400">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-3 text-slate-100 tracking-tight">
        {isCurrency ? `$${value}` : value}
      </p>

      {/* badge de color (reemplaza el gradiente chillón) */}
      <div
        className={`
          mt-4
          inline-block
          px-3 py-1
          text-xs
          font-medium
          rounded-full
          ${variantStyles[variant]}
        `}
      >
        ● activo
      </div>
    </div>
  );
}