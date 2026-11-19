import MaterialitySection from "@/components/MaterialitySection";
import DebtSection from "@/components/DebtSection";
import DebtRatiosSection from "@/components/DebtRatiosSection";
import ShareholderDistributionSection from "@/components/ShareholderDistributionSection";

export const instant = false;

type MaterialityBenchmark = {
  year: number;
  benchmark: string;
  value: number;
};

type MaterialityRecord = {
  year: number;
  total_assets: number;
  profit_before_tax: number;
  assets_1pct: number;
  pbt_5pct: number | null;
  pbt_3yr_avg_5pct: number | null;
};

type MaterialityApiResponse = {
  company: string;
  cik: string;
  data: MaterialityRecord[];
};

type DebtBenchmark = {
  year: number;
  value: number;
};

type DebtApiResponse = {
  company: string;
  cik: string;
  data: DebtBenchmark[];
};

type DebtRatiosApiResponse = {
  company: string;
  cik: string;
  data: {
    year: number;
    debt_leases_to_revenue_pct: number;
    debt_leases_to_cfo: number;
  }[];
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

type ShareholderDistributionApiResponse = {
  company: string;
  cik: string;
  data: {
    year: number;
    distributions_pct_net_income: number;
  }[];
};




export default async function Home() {
  
    const response = await fetch(
        "http://127.0.0.1:8000/materiality",
        { cache: "no-store" } 
        );

    if (!response.ok) {
      throw new Error("Failed to fetch materiality data");
    }

  const materialityApi: MaterialityApiResponse = await response.json();

    const materialityBenchmarks: MaterialityBenchmark[] =
      materialityApi.data.flatMap((record) => [
        {
          year: record.year,
          benchmark: "1% of Total Assets",
          value: record.assets_1pct / 1_000_000,
        },
        {
          year: record.year,
          benchmark: "5% of Profit Before Tax",
          value: record.pbt_5pct === null
            ? null
            : record.pbt_5pct / 1_000_000,
        },
        {
          year: record.year,
          benchmark: "5% of 3-Year Average PBT",
          value: record.pbt_3yr_avg_5pct === null
            ? null
            : record.pbt_3yr_avg_5pct / 1_000_000,
        },
      ]).filter(
        (item) => item.value !== null
      ) as MaterialityBenchmark[];

    const debtResponse = await fetch(
      "http://127.0.0.1:8000/debt-obligations",
      { cache: "no-store" }
    );

      if (!debtResponse.ok) {
        throw new Error("Failed to fetch debt obligations data");
      }

      const debtApi: DebtApiResponse = await debtResponse.json();

      const debtBenchmarks: DebtBenchmark[] = debtApi.data;

    const debtRatiosResponse = await fetch(
        "http://127.0.0.1:8000/debt-ratios",
        { cache: "no-store" }
      );

      if (!debtRatiosResponse.ok) {
        throw new Error("Failed to fetch debt ratios");
      }

    const debtRatiosApi: DebtRatiosApiResponse =
  await debtRatiosResponse.json();

    const debtPerformanceBenchmarks: DebtPerformanceBenchmark[] =
      debtRatiosApi.data
        .filter((record) => ![2020, 2021].includes(record.year))
        .map((record) => ({
          year: record.year,
          debtToRevenuePct: record.debt_leases_to_revenue_pct,
          debtToCfo: record.debt_leases_to_cfo,
        }));
      
    const shareholderDistributionResponse = await fetch(
      "http://127.0.0.1:8000/shareholder-distributions",
      { cache: "no-store" }
    );

      if (!shareholderDistributionResponse.ok) {
        throw new Error("Failed to fetch shareholder distributions");
      }

      const shareholderDistributionApi: ShareholderDistributionApiResponse =
        await shareholderDistributionResponse.json();

      const shareholderDistributionBenchmarks: ShareholderDistributionBenchmark[] =
        shareholderDistributionApi.data.map((record) => ({
          year: record.year,
          percentage: record.distributions_pct_net_income,
        }));

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
