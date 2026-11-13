import DebtRatiosChart from "@/components/DebtRatiosChart";

type DebtPerformanceBenchmark = {
  year: number;
  debtToRevenuePct: number;
  debtToCfo: number;
};

type DebtRatiosSectionProps = {
  benchmarks: DebtPerformanceBenchmark[];
};

export default function DebtRatiosSection({
  benchmarks,
}: DebtRatiosSectionProps) {
  return (
    <section>
      <h2>Debt and Lease Obligations Relative to Revenue and Operating Cash Flow</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <DebtRatiosChart data={benchmarks} />
      </div>
    </section>
  );
}