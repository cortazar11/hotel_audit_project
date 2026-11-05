# Hotel Audit Project – Marriott International

## 1. Project Overview

This project applies Python-based financial analysis and preliminary audit analytics to **Marriott International, Inc.**

It uses publicly available financial information from the U.S. Securities and Exchange Commission (SEC) to extract, process and analyse financial data reported in annual Form 10-K filings.

The objective is to demonstrate how data analytics can support the preliminary assessment of financial reporting risks in the hotel industry.

The project combines financial statement analysis, financial ratios, materiality benchmarks and audit-oriented interpretation.

## 2. Objectives

The main objectives are to:

- Retrieve financial information from the SEC EDGAR database.
- Extract and process annual financial data using Python.
- Calculate financial metrics and ratios.
- Analyse trends in profitability, liquidity, debt and cash flows.
- Calculate preliminary materiality benchmarks.
- Identify potential financial reporting risks and unusual trends.
- Present the results through charts, tables and written analysis.
- Develop reusable Python functions for future financial analysis.

## 3. Data Sources

The analysis uses publicly available financial information from:

- **Company:** Marriott International, Inc.
- **Ticker:** MAR (Nasdaq)
- **CIK:** 0001048286
- **Main source:** SEC EDGAR Company Facts API.
- **Financial reports:** Annual Form 10-K filings.

Data sources:

- **SEC EDGAR:** [Marriott International, Inc.](https://www.sec.gov/edgar/browse/?CIK=1048286&owner=exclude)
- **Company Facts API:** [Marriott XBRL data](https://data.sec.gov/api/xbrl/companyfacts/CIK0001048286.json)

The project uses financial information reported under the US GAAP XBRL taxonomy.

## 4. Methodology

### 4.1 Data Extraction

Financial data is retrieved from the SEC EDGAR Company Facts API.

The extraction process considers relevant XBRL information, including:

- Financial concepts and reporting units.
- Fiscal years and reporting periods.
- Filing dates and accession numbers.
- Annual filing information.
- Repeated observations across different filings.

Particular attention is given to selecting the appropriate annual observations and avoiding duplicated or inconsistent reporting periods.

### 4.2 Data Processing

Python and pandas are used to organise, clean and transform the extracted financial information into structured datasets.

Reusable functions are developed to facilitate data extraction and financial calculations.

### 4.3 Financial Analysis

The project examines selected financial statement items and derived indicators, including profitability, liquidity, debt and lease obligations, and cash flows.

### 4.4 Preliminary Materiality Benchmarks

The analysis calculates preliminary materiality benchmarks using:

- 1% of total assets.
- 5% of current-year profit before tax, where positive.
- 5% of the three-year average profit before tax, where positive.

These calculations are analytical reference points rather than a determination of final audit materiality.

### 4.5 Audit Risk Assessment

The financial analysis is interpreted from an audit perspective.

The objective is to identify potential risk indicators and areas that may require further investigation, rather than to establish that a material misstatement has occurred.

## 5. Technology Stack

| Technology | Purpose |
|---|---|
| Python | Data extraction and analysis |
| pandas | Data manipulation and processing |
| NumPy | Numerical calculations |
| Matplotlib | Data visualisation |
| requests | SEC API access |
| Jupyter Notebook | Exploratory analysis and documentation |
| python-docx | Word report generation |
| XBRL | Financial data format |
| VS Code | Development environment |
| Git and GitHub | Version control and project hosting |
| Python virtual environment | Dependency management |

**Planned technologies:**

- FastAPI for a future Python API layer.
- Next.js for a future web-based presentation layer.

## 6. Project Structure

```text
Hotel_Audit_Project/
├── reports/
├── scripts/
│   └── generate_report.py
├── src/
│   └── hotel_audit/
│       ├── __init__.py
│       ├── sec_data.py
│       ├── financial_metrics.py
│       └── materiality.py
├── 01.sec_data_exploration.ipynb
├── 02.audit-analytics.ipynb
├── requirements.txt
└── README.md
```

## 7. Key Audit Analytics

The project includes the following areas of analysis:

### 7.1 Revenue and Profitability

Analysis of revenue, profit before tax, operating income and profitability trends.

### 7.2 Financial Position

Examination of total assets and selected balance sheet items.

### 7.3 Debt and Lease Obligations

Analysis of total debt and lease obligations, including current maturities and long-term balances.

### 7.4 Liquidity and Cash Flows

Assessment of liquidity indicators, operating cash flows and interest coverage.

### 7.5 Shareholder Distributions

Comparison of dividends and share repurchases with net income and operating cash flows.

### 7.6 Materiality Benchmarks

Calculation and visualisation of preliminary materiality benchmarks based on total assets and profit before tax.

### 7.7 Preliminary Audit Risk Assessment

Integration of the financial indicators to identify potential areas of audit risk and suggest further audit procedures.

## 8. How to Run the Project

### 8.1 Clone the Repository

```bash
git clone https://github.com/cortazar11/hotel_audit_project.git
cd hotel_audit_project
```

### 8.2 Create a Virtual Environment

```bash
python -m venv .venv
```

### 8.3 Activate the Virtual Environment

On Windows:

```bash
.venv\Scripts\activate
```

### 8.4 Install Dependencies

```bash
python -m pip install -r requirements.txt
```

### 8.5 Run the Notebooks

Start Jupyter Notebook:

```bash
jupyter notebook
```

Run the notebooks in sequence:

1. `01.sec_data_exploration.ipynb`
2. `02.audit-analytics.ipynb`

An active internet connection is required to retrieve financial information from the SEC API.

### 8.6 Generate the Word Report

Run:

```bash
python scripts/generate_report.py
```

The generated report is saved in the `reports/` directory.

## 9. Limitations

The project has several limitations:

- The analysis relies on selected financial information retrieved from public SEC XBRL data.
- The accuracy of the analysis depends on the quality and consistency of the reported data.
- The project does not include independent verification of the financial information.
- Only selected financial statement items and derived metrics are examined.
- Materiality calculations are preliminary benchmarks and do not represent final audit materiality.
- Financial ratios and trends may indicate potential risks but do not establish the existence of misstatements or fraud.
- Suggested audit procedures are illustrative and would require further investigation.
- No transaction-level testing, external confirmations, control testing or audit opinion is included.
- The analysis focuses on Marriott International and is not intended to represent the entire hotel industry.

## 10. Future Development

Potential extensions of the project include:

- Expanding the reusable Python functions into a more comprehensive financial analysis package.
- Adding automated data validation and error handling.
- Developing unit tests for the extraction and calculation functions.
- Extending the analysis to other hotel companies.
- Building a FastAPI layer to expose the Python analysis through an API.
- Developing a Next.js frontend to present the financial indicators and audit analytics interactively.
- Enabling comparative analysis across companies and reporting periods.

---

**Author:** Independent financial and audit analytics project  
**Focus:** Python, financial statement analysis and audit analytics  
**Industry:** Hospitality and hotel sector  
**Company analysed:** Marriott International, Inc.