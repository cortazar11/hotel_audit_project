# Hotel Audit Project – Marriott International

## 1. Project Overview

This project applies Python-based financial analysis and preliminary audit analytics to **Marriott International, Inc.**

It retrieves publicly available financial information from the U.S. Securities and Exchange Commission (SEC), processes annual Form 10-K data, calculates financial indicators and presents selected results through an interactive web dashboard.

The project combines three layers:

- **Python:** SEC data extraction, financial calculations and audit-oriented analysis.
- **FastAPI:** a REST API that exposes selected Python analysis results as JSON.
- **Next.js:** a web frontend that retrieves the API data and presents it through charts.

The purpose is to demonstrate how data analytics can support the preliminary assessment of financial reporting risks in the hotel industry. The analysis is not an audit opinion.

## 2. Objectives

The main objectives are to:

- Retrieve financial information from the SEC EDGAR database.
- Extract and process annual financial data using Python.
- Develop reusable functions for financial data extraction and calculations.
- Analyse trends in profitability, liquidity, debt, leases and cash flows.
- Calculate preliminary materiality benchmarks.
- Identify potential financial reporting risks and unusual trends.
- Present selected results through charts, tables and written analysis.
- Provide a foundation for extending the analysis to other hotel companies.

## 3. Data Sources

The analysis uses publicly available financial information from:

- **Company:** Marriott International, Inc.
- **Ticker:** MAR (Nasdaq)
- **CIK:** 0001048286
- **Main source:** SEC EDGAR Company Facts API.
- **Financial reports:** Annual Form 10-K filings.

Data sources:

- [SEC EDGAR – Marriott International, Inc.](https://www.sec.gov/edgar/browse/?CIK=1048286&owner=exclude)
- [SEC Company Facts API – Marriott XBRL data](https://data.sec.gov/api/xbrl/companyfacts/CIK0001048286.json)

The project uses financial information reported under the US GAAP XBRL taxonomy.

## 4. Methodology

### 4.1 Data Extraction

Financial data is retrieved from the SEC EDGAR Company Facts API.

The extraction process considers relevant XBRL information, including financial concepts, reporting units, fiscal years, reporting periods, filing dates and accession numbers. Particular attention is given to selecting appropriate annual observations and avoiding duplicated or inconsistent reporting periods.

### 4.2 Data Processing and Financial Calculations

Python and pandas are used to organise, clean and transform the extracted information into structured datasets. Reusable functions are maintained in the `src/hotel_audit/` package and are used by the analysis and API layers.

### 4.3 Preliminary Materiality Benchmarks

The analysis calculates preliminary benchmarks using:

- 1% of total assets.
- 5% of current-year profit before tax, where positive.
- 5% of the three-year average profit before tax, where positive.

These calculations are analytical reference points, not a determination of final audit materiality.

### 4.4 Audit Risk Assessment

Financial indicators are interpreted from an audit perspective to identify potential risk areas and matters that may require further investigation. The indicators do not, by themselves, establish that a material misstatement has occurred.

## 5. Technology Stack

| Technology | Purpose |
|---|---|
| Python | Data extraction and financial analysis |
| pandas and NumPy | Data manipulation and numerical calculations |
| Matplotlib | Notebook data visualisation |
| requests | SEC API access |
| python-dotenv | Loading the SEC User-Agent from an environment file |
| Jupyter Notebook | Exploratory analysis and documentation |
| FastAPI | REST API for the Python analysis |
| Uvicorn | Local ASGI server for FastAPI |
| Next.js and React | Web frontend |
| TypeScript | Frontend type safety |
| Recharts | Interactive charts |
| Tailwind CSS | Frontend styling |
| Git and GitHub | Version control and project hosting |

## 6. Project Architecture

The application follows this data flow:

```text
SEC EDGAR Company Facts API
             |
             v
     Python package
       src/hotel_audit/
             |
             v
       FastAPI backend
        backend/main.py
             |
       JSON endpoints
             |
             v
       Next.js frontend
          frontend/
             |
             v
       Dashboard charts
```

Python contains the data extraction and calculation logic. FastAPI exposes selected results through JSON endpoints, and Next.js is responsible for presenting those results.

### API endpoints

When the backend is running locally, the following endpoints are available:

| Endpoint | Data returned |
|---|---|
| `/` | API status message |
| `/materiality` | Preliminary materiality benchmarks |
| `/debt-obligations` | Annual long-term debt and lease obligations |
| `/debt-ratios` | Debt and lease obligations relative to revenue and operating cash flow |
| `/shareholder-distributions` | Shareholder distributions as a percentage of net income |

Interactive API documentation is available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) while the backend is running.

## 7. Project Structure

The main project files are organised as follows:

```text
hotel_audit_project/
├── backend/
│   └── main.py
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
├── reports/
│   └── Marriott_Report.docx
├── scripts/
│   └── generate_report.py
├── src/
│   └── hotel_audit/
│       ├── __init__.py
│       ├── sec_data.py
│       ├── financial_metrics.py
│       └── materiality.py
├── 01_sec_data_exploration.ipynb
├── 02_audit-analytics.ipynb
├── requirements.txt
└── README.md
```

The repository also contains exported charts and supporting analysis files.

## 8. Key Audit Analytics

The project includes the following areas of analysis:

### 8.1 Revenue and Profitability

Analysis of revenue, profit before tax, operating income and profitability trends.

### 8.2 Financial Position

Examination of total assets and selected balance sheet items.

### 8.3 Debt and Lease Obligations

Analysis of debt and lease obligations, including current maturities and long-term balances.

### 8.4 Liquidity and Cash Flows

Assessment of liquidity indicators, operating cash flows and interest coverage.

### 8.5 Shareholder Distributions

Comparison of dividends and share repurchases with net income and operating cash flows.

### 8.6 Materiality Benchmarks

Calculation and visualisation of preliminary materiality benchmarks based on total assets and profit before tax.

### 8.7 Preliminary Audit Risk Assessment

Integration of financial indicators to identify potential areas of audit risk and suggest further audit procedures.

## 9. How to Run the Project Locally

The backend and frontend run as separate processes. Start the backend first, then start the frontend in a second terminal.

### 9.1 Clone the Repository

```bash
git clone https://github.com/cortazar11/hotel_audit_project.git
cd hotel_audit_project
```

### 9.2 Create and Activate the Python Virtual Environment

On Windows:

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 9.3 Install Python Dependencies

```bash
python -m pip install -r requirements.txt
```

### 9.4 Configure the SEC User-Agent

The SEC API requires an identifying User-Agent that includes contact information. Create a file named `.env` in the project root (the same directory as `requirements.txt`) and add:

```text
SEC_USER_AGENT=HotelAuditProject your-contact-email@example.com
```

Replace the example address with your own contact email. Keep `.env` local: it is excluded from Git and should not be committed or published.

### 9.5 Start the FastAPI Backend

From the project root, with the Python virtual environment activated, run:

```bash
uvicorn backend.main:app --reload
```

The API will be available at:

- API root: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- Interactive documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

Keep this terminal running.

### 9.6 Start the Next.js Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The current frontend uses the local API address `http://127.0.0.1:8000`. Therefore, the FastAPI backend must be running locally for the dashboard to retrieve its data.

### 9.7 Run the Jupyter Notebooks

From the project root, activate the Python virtual environment if necessary, then run:

```bash
jupyter notebook
```

The notebooks are:

1. `01_sec_data_exploration.ipynb`
2. `02_audit-analytics.ipynb`

An active internet connection is required to retrieve financial information from the SEC API.

### 9.8 Generate the Word Report

From the project root, run:

```bash
python scripts/generate_report.py
```

The generated report is saved in the `reports/` directory.

## 10. Limitations

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
- The API and frontend are currently configured for local development; deployment and production configuration remain future work.

## 11. Future Development

Potential extensions of the project include:

- Adding automated data validation and more comprehensive error handling.
- Developing unit tests for the extraction and calculation functions.
- Making the frontend API address configurable for deployment.
- Deploying the FastAPI backend and Next.js frontend as separate services.
- Extending the analysis to other hotel companies.
- Enabling comparative analysis across companies and reporting periods.

---

**Focus:** Python, financial statement analysis and audit analytics  
**Industry:** Hospitality and hotel sector  
**Company analysed:** Marriott International, Inc.
