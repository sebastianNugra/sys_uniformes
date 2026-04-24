interface SummaryCardProps {
  title: string;
  value: number;
}

export default function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl shadow-md p-6 border">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl mt-2">${value}</p>
    </div>
  );
}