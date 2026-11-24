"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type DebtRatiosChartProps = {
  data: {
    year: number;
    debtToRevenuePct: number;
    debtToCfo: number;
  }[];
};

export default function DebtRatiosChart({
  data,
}: DebtRatiosChartProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Debt relative to revenue */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-600">
          Debt and leases / Revenue (%)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
                width={38}
                tick={{ fontSize: 12 }}
                tickMargin={4}
                tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
                offset={10}
                allowEscapeViewBox={{ x: false, y: false }}
                formatter={(value) => [
                  `${Number(value).toFixed(2)}%`,
                  "Debt / Revenue",
                ]}
            />
            <Line
              type="monotone"
              dataKey="debtToRevenuePct"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Debt relative to operating cash flow */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-600">
          Debt and leases / Operating cash flow (x)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
              data={data}
              margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
                width={38}
                tick={{ fontSize: 12 }}
                tickMargin={4}
                tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
                offset={10}
                allowEscapeViewBox={{ x: false, y: false }}
                wrapperStyle={{ transform: "translateX(-50%)" }}
                formatter={(value) => [
                  `${Number(value).toFixed(2)}x`,
                  "Debt / Operating cash flow",
                ]}
            />
            <Line
              type="monotone"
              dataKey="debtToCfo"
              stroke="#16a34a"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}