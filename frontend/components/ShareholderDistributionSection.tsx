import ShareholderDistributionChart from "@/components/ShareholderDistributionChart";

type ShareholderDistributionBenchmark = {
  year: number;
  percentage: number;
};

type ShareholderDistributionSectionProps = {
  benchmarks: ShareholderDistributionBenchmark[];
};

export default function ShareholderDistributionSection({
  benchmarks,
}: ShareholderDistributionSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Shareholder Distributions Relative to Net Income
      </h2>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-sm font-medium text-gray-600">
          Shareholder distributions / Net income (%)
        </h3>

        <ShareholderDistributionChart data={benchmarks} />
      </div>
    </section>
  );
}