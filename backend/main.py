from fastapi import FastAPI,HTTPException
import sys
from pathlib import Path
from functools import lru_cache

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from hotel_audit.sec_data import (
    get_company_facts,
    get_original_annual_fact,
    extract_annual_concept
)

from hotel_audit.materiality import (
    calculate_assets_materiality,
    calculate_pbt_materiality,
    calculate_average_pbt_materiality
)

from hotel_audit.financial_metrics import (
    calculate_debt_ratios,
    calculate_distributions_to_net_income
)

CIK = "1048286"
USER_AGENT = "Miguel Martinez miguel.martinez11@gmail.com"

# Helper functions
@lru_cache(maxsize=1)
def get_marriott_data():
    data = get_company_facts(CIK, USER_AGENT)
    return data

def get_materiality_data(data):
    assets_df = get_original_annual_fact(data, "Assets")

    pbt_df = get_original_annual_fact(
        data,
        "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest"
    )

    assets_annual = assets_df[
        assets_df["end"].str[:4].astype(int) == assets_df["year"]
    ].copy()

    pbt_annual = pbt_df[
        (pbt_df["end"].str[:4].astype(int) == pbt_df["year"])
        & (pbt_df["end"].str.endswith("-12-31"))
    ].copy()

    benchmark_df = (
    assets_annual[["year", "value"]]
    .rename(columns={"value": "total_assets"})
    .merge(
        pbt_annual[["year", "value"]]
        .rename(columns={"value": "profit_before_tax"}),
        on="year",
        how="inner"
        )
    )
    return benchmark_df

def calculate_materiality(benchmark_df):
    result = calculate_assets_materiality(benchmark_df)
    result = calculate_pbt_materiality(result)
    result = calculate_average_pbt_materiality(result)

    return result

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hotel Audit API is running"}

@app.get("/materiality")
def materiality():
    try:
        data = get_marriott_data()
        benchmark_df = get_materiality_data(data)
        materiality_df = calculate_materiality(benchmark_df)

        materiality_df = materiality_df.astype(object).where(
            materiality_df.notna(), None
        )


        return {
        "company": "Marriott International, Inc.",
        "cik": CIK,
        "data": materiality_df.to_dict(orient="records")
        }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Unable to retrieve or process SEC data: {str(e)}"
        )

@app.get("/debt-obligations")
def debt_obligations():
    try:
        data = get_marriott_data()

        debt_df = extract_annual_concept(
            data["facts"]["us-gaap"],
            "LongTermDebtAndCapitalLeaseObligations",
            "long_term_debt_and_leases"
        )

        return {
            "company": "Marriott International, Inc.",
            "cik": CIK,
            "data": debt_df[
                ["year", "long_term_debt_and_leases"]
            ].rename(
                columns={
                    "long_term_debt_and_leases": "value"
                }
            ).to_dict(orient="records")
        }

    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Unable to retrieve or process SEC data: {str(e)}"
        )


@app.get("/debt-ratios")
def debt_ratios():
    try:
        data = get_marriott_data()

        debt_df = extract_annual_concept(
            data["facts"]["us-gaap"],
            "LongTermDebtAndCapitalLeaseObligations",
            "long_term_debt_and_leases",
            start_year=2015,
            end_year=2025
        )

        revenue_df = extract_annual_concept(
                data["facts"]["us-gaap"],
                "Revenues",
                "revenue",
                start_year=2015,
                end_year=2025
            )

        cfo_df = extract_annual_concept(
            data["facts"]["us-gaap"],
            "NetCashProvidedByUsedInOperatingActivities",
            "operating_cash_flow",
            start_year=2015,
            end_year=2025
        )

        debt_comparison = (
            debt_df[["year", "long_term_debt_and_leases"]]
            .merge(
                revenue_df[["year", "revenue"]],
                on="year",
                how="inner"
            )
            .merge(
                cfo_df[["year", "operating_cash_flow"]],
                on="year",
                how="inner"
            )
        )

        result = calculate_debt_ratios(debt_comparison)

        return {
            "company": "Marriott International, Inc.",
            "cik": CIK,
            "data": result[
                [
                    "year",
                    "debt_leases_to_revenue_pct",
                    "debt_leases_to_cfo"
                ]
            ].to_dict(orient="records")
        }

    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Unable to retrieve or process SEC data: {str(e)}"
        )

@app.get("/shareholder-distributions")
def shareholder_distributions():
    try:
        data = get_marriott_data()
        us_gaap = data["facts"]["us-gaap"]

        net_income_df = extract_annual_concept(
            us_gaap,
            "NetIncomeLoss",
            "net_income_bn",
            start_year=2022,
            end_year=2025
        )

        dividends_df = extract_annual_concept(
            us_gaap,
            "PaymentsOfDividendsCommonStock",
            "dividends_bn",
            start_year=2022,
            end_year=2025
        )

        treasury_df = extract_annual_concept(
            us_gaap,
            "TreasuryStockValueAcquiredCostMethod",
            "treasury_stock_purchases_bn",
            start_year=2022,
            end_year=2025
        )

        distributions_df = (
            net_income_df[["year", "net_income_bn"]]
            .merge(
                dividends_df[["year", "dividends_bn"]],
                on="year",
                how="inner"
            )
            .merge(
                treasury_df[["year", "treasury_stock_purchases_bn"]],
                on="year",
                how="inner"
            )
        )

        result = calculate_distributions_to_net_income(
            distributions_df
        )

        return {
            "company": "Marriott International, Inc.",
            "cik": CIK,
            "data": result[
                ["year", "distributions_pct_net_income"]
            ].to_dict(orient="records")
        }

    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Unable to retrieve or process SEC data: {str(e)}"
        )





    