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

    const apiBaseUrl = process.env.BACKEND_API_URL;

    if (!apiBaseUrl) {
      throw new Error("BACKEND_API_URL is not configured");
    }
  

      // Fetch all four endpoints concurrently
      const [
        response,
        debtResponse,
        debtRatiosResponse,
        shareholderDistributionResponse,
      ] = await Promise.all([
        fetch(`${apiBaseUrl}/materiality`, { cache: "no-store" }),
        fetch(`${apiBaseUrl}/debt-obligations`, { cache: "no-store" }),
        fetch(`${apiBaseUrl}/debt-ratios`, { cache: "no-store" }),
        fetch(`${apiBaseUrl}/shareholder-distributions`, { cache: "no-store" }),
      ]);

      // Check all responses
      if (!response.ok) {
        throw new Error("Failed to fetch materiality data");
      }

      if (!debtResponse.ok) {
        throw new Error("Failed to fetch debt obligations data");
      }

      if (!debtRatiosResponse.ok) {
        throw new Error("Failed to fetch debt ratios");
      }

      if (!shareholderDistributionResponse.ok) {
        throw new Error("Failed to fetch shareholder distributions");
      }

      // Parse all four responses
      const [
        materialityApi,
        debtApi,
        debtRatiosApi,
        shareholderDistributionApi,
      ] = await Promise.all([
        response.json() as Promise<MaterialityApiResponse>,
        debtResponse.json() as Promise<DebtApiResponse>,
        debtRatiosResponse.json() as Promise<DebtRatiosApiResponse>,
        shareholderDistributionResponse.json() as Promise<ShareholderDistributionApiResponse>,
      ]);

      // Transform materiality data
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

      // Transform debt data
      const debtBenchmarks: DebtBenchmark[] = debtApi.data;

      // Transform debt ratios
      const debtPerformanceBenchmarks: DebtPerformanceBenchmark[] =
        debtRatiosApi.data
          .filter((record) => ![2020, 2021].includes(record.year))
          .map((record) => ({
            year: record.year,
            debtToRevenuePct: record.debt_leases_to_revenue_pct,
            debtToCfo: record.debt_leases_to_cfo,
          }));

      // Transform shareholder distributions
      const shareholderDistributionBenchmarks: ShareholderDistributionBenchmark[] =
        shareholderDistributionApi.data.map((record) => ({
          year: record.year,
          percentage: record.distributions_pct_net_income,
        }));


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-12 px-4 sm:px-6 md:px-16 bg-white dark:bg-black sm:items-start">
        
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
