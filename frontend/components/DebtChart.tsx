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

type DebtChartProps = {
  data: {
    year: number;
    value: number;
  }[];
};

export default function DebtChart({ data }: DebtChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
            tickFormatter={(value) => `$${value}B`}
            domain={[0, "auto"]}
        />
        <Tooltip 
            formatter={(value) => [
                `$${Number(value).toFixed(3)} billion`,
                "Debt and leases",
            ]}
        />
        <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[5, 5, 0, 0]}
        />
        
      </BarChart>
    </ResponsiveContainer>
  );
}