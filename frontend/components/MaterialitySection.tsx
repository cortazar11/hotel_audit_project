"use client";

import { useState } from "react";
import MaterialityCard from "@/components/MaterialityCard";
import YearSelector from "@/components/YearSelector";

type MaterialityBenchmark = {
  year: number;
  benchmark: string;
  value: number;
};

type MaterialitySectionProps = {
  benchmarks: MaterialityBenchmark[];
};

export default function MaterialitySection({ benchmarks }: MaterialitySectionProps) {
    const [selectedYear, setSelectedYear] = useState<number>(2025);

    // Filtering inside Home()
    const filteredBenchmarks = benchmarks.filter(
        (item) => item.year === selectedYear
    );

    return (
        <section>
            <h2>Materiality Benchmarks</h2>
            <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
            <div className="flex flex-wrap gap-6">
                {filteredBenchmarks.length > 0 ? (
                    filteredBenchmarks.map((item) => (
                    <MaterialityCard
                        key={item.benchmark}
                        title="Materiality Benchmark"
                        benchmark={item.benchmark}
                        value={item.value}
                    />
                    ))
                ) : (
                    <p>No materiality data available for this year.</p>
                )}
        </div>
           
        </section>
    );
}