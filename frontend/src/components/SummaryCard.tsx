type SummaryCardProps = {
  title: string;
  value: number;
  isCurrency?: boolean;
};

export default function SummaryCard({
  title,
  value,
  isCurrency = true,
}: SummaryCardProps) {
  return (
    <div className="border rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <p className="text-2xl font-bold mt-2">
        {isCurrency ? `$${value}` : value}
      </p>
    </div>
  );
}