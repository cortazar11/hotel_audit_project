"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type ShareholderDistributionChartProps = {
  data: {
    year: number;
    percentage: number;
  }[];
};

export default function ShareholderDistributionChart({
  data,
}: ShareholderDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip
          formatter={(value) => [
            `${Number(value).toFixed(1)}%`,
            "Distributions / Net income",
          ]}
        />
        <Bar
          dataKey="percentage"
          fill="#2563eb"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}