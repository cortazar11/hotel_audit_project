from fastapi import FastAPI
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from hotel_audit.sec_data import (
    get_company_facts,
    get_original_annual_fact
)

from hotel_audit.materiality import (
    calculate_assets_materiality,
    calculate_pbt_materiality,
    calculate_average_pbt_materiality
)

CIK = "1048286"
USER_AGENT = "Miguel Martinez miguel.martinez11@gmail.com"

# Helper functions
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
    data = get_marriott_data()
    benchmark_df = get_materiality_data(data)
    materiality_df = calculate_materiality(benchmark_df)

    materiality_df = materiality_df.astype(object).where(
        materiality_df.notna(), None
    )


    return materiality_df.to_dict(orient="records")


if __name__ == "__main__":
    data = get_marriott_data()
    
    print(type(data))
    print(data["entityName"])
    print(data["facts"].keys())

    benchmark_df = get_materiality_data(data)

    print(benchmark_df.head())

    materiality_df = calculate_materiality(benchmark_df)

    print(materiality_df.columns.tolist())
    print(materiality_df.head())