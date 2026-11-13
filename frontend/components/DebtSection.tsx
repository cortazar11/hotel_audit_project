import DebtChart from "@/components/DebtChart";

type DebtBenchmark = {
  year: number;
  value: number;
};

type DebtSectionProps = {
  benchmarks: DebtBenchmark[];
};

export default function DebtSection({
  benchmarks,
}: DebtSectionProps) {
  return (
    <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">
            Debt and Lease Obligations
        </h2>

        <h3 className="mb-2 text-sm font-medium text-gray-600">
            Non-current debt and lease obligations (USD billions)
        </h3>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <DebtChart data={benchmarks} />
        </div>

      <div className="flex flex-wrap gap-6">
        {benchmarks.map((item) => (
            <div
            key={item.year}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
            <h3 className="text-sm font-medium text-gray-500">
                {item.year}
            </h3>

            <p className="mt-2 text-2xl font-bold text-gray-900">
                ${item.value.toFixed(3)} billion
            </p>
            </div>
        ))}
    </div>
    </section>
  );
}