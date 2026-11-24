"use client";


type YearSelectorProps = {
  selectedYear: number;
  onYearChange: (year: number) => void;
};

export default function YearSelector({
        selectedYear,
        onYearChange,
    }: YearSelectorProps) {
   


  return (
    <div>
      <label htmlFor="year">Financial year: </label>

      <select
        id="year"
        value={selectedYear}
        onChange={(event) => onYearChange(Number(event.target.value))}
        // onChange={(event) => setSelectedYear(Number(event.target.value))}
      >
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
      </select>

      <p>Selected year: {selectedYear}</p>
    </div>
  );
}

