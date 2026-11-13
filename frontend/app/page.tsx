import MaterialitySection from "@/components/MaterialitySection";
import DebtSection from "@/components/DebtSection";
import DebtRatiosSection from "@/components/DebtRatiosSection";
import ShareholderDistributionSection from "@/components/ShareholderDistributionSection";

type MaterialityBenchmark = {
  year: number;
  benchmark: string;
  value: number;
};

type DebtBenchmark = {
  year: number;
  value: number;
};
type DebtPerformanceBenchmark = {
  year: number;
  debtToRevenuePct: number;
  debtToCfo: number;
};

type ShareholderDistributionBenchmark = {
  year: number;
  percentage: number;
};

const materialityBenchmarks: MaterialityBenchmark[] = [
  {
    year: 2023,
    benchmark: "1% of Total Assets",
    value: 248.15,
  },
  {
    year: 2023,
    benchmark: "5% of Profit Before Tax",
    value: 155.70,
  },
  {
    year: 2023,
    benchmark: "5% of 3-Year Average PBT",
    value: 127.87,
  },
  {
    year: 2024,
    benchmark: "1% of Total Assets",
    value: 256.74,
  },
  {
    year: 2024,
    benchmark: "5% of Profit Before Tax",
    value: 168.90,
  },
  {
    year: 2024,
    benchmark: "5% of 3-Year Average PBT",
    value: 160.72,
  },
  {
    year: 2025,
    benchmark: "1% of Total Assets",
    value: 275.40,
  },
  {
    year: 2025,
    benchmark: "5% of Profit Before Tax",
    value: 169.70,
  },
  {
    year: 2025,
    benchmark: "5% of 3-Year Average PBT",
    value: 165.38,
  },
];

const debtBenchmarks: DebtBenchmark[] = [
  { year: 2021, value: 9.333 },
  { year: 2022, value: 9.380 },
  { year: 2023, value: 11.320 },
  { year: 2024, value: 13.138 },
  { year: 2025, value: 14.995 },
];

const debtPerformanceBenchmarks: DebtPerformanceBenchmark[] = [
  { year: 2015, debtToRevenuePct: 26.28, debtToCfo: 2.66 },
  { year: 2016, debtToRevenuePct: 48.01, debtToCfo: 5.18 },
  { year: 2017, debtToRevenuePct: 34.24, debtToCfo: 3.22 },
  { year: 2018, debtToRevenuePct: 41.02, debtToCfo: 3.61 },
  { year: 2019, debtToRevenuePct: 47.51, debtToCfo: 5.91 },
  { year: 2022, debtToRevenuePct: 45.15, debtToCfo: 3.97 },
  { year: 2023, debtToRevenuePct: 47.74, debtToCfo: 3.57 },
  { year: 2024, debtToRevenuePct: 52.34, debtToCfo: 4.78 },
  { year: 2025, debtToRevenuePct: 57.26, debtToCfo: 4.67 },
];

const shareholderDistributionBenchmarks: ShareholderDistributionBenchmark[] = [
  { year: 2022, percentage: 123.9 },
  { year: 2023, percentage: 147.3 },
  { year: 2024, percentage: 187.1 },
  { year: 2025, percentage: 154.2 },
];

export default function Home() {
  

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <div className="flex flex-wrap gap-6">
          <h1 className="text-3xl font-bold">
              Marriott International – Audit Analytics
          </h1>
          <MaterialitySection benchmarks={materialityBenchmarks} />
          <DebtSection benchmarks={debtBenchmarks} />
          <DebtRatiosSection benchmarks={debtPerformanceBenchmarks} />
          <ShareholderDistributionSection benchmarks={shareholderDistributionBenchmarks} />
        </div>
      </main>
    </div>
  );
}
