type MaterialityCardProps = {
  title: string;
  benchmark: string;
  value: number;
};

export default function MaterialityCard({title, benchmark, value}: MaterialityCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-medium text-gray-500">
        {title}
    </h2>

    <p className="mt-2 text-sm text-gray-700">
        {benchmark}
    </p>

    <h3 className="mt-3 text-2xl font-bold text-gray-900">
        ${value.toFixed(1)} million
    </h3>
    </div>
  );
}