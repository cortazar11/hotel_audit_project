
import requests
from datetime import date
import pandas as pd
import numpy as np

def get_company_facts(cik, user_agent):
    """
    Retrieve company facts from the SEC EDGAR API.

    Parameters
    ----------
    cik : str or int
        SEC Central Index Key.
    user_agent : str
        Contact information required by the SEC.

    Returns
    -------
    dict
        Company facts in JSON format.
    """

    cik = str(cik).zfill(10)

    url = f"https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json"

    headers = {
        "User-Agent": user_agent
    }

    response = requests.get(url, headers=headers, timeout=30)
    response.raise_for_status()

    return response.json()



def get_annual_facts(us_gaap, concept_name, start_year, end_year):
    """
    Extract one annual observation per fiscal year from SEC Company Facts.

    Handles:
    - instant facts: balance-sheet items
    - duration facts: income-statement items
    """

    facts = us_gaap[concept_name]["units"]["USD"]

    candidates = [
        item
        for item in facts
        if (
            item.get("fy") is not None
            and start_year <= item["fy"] <= end_year
            and item.get("form") == "10-K"
        )
    ]

    annual_facts = []

    for fy in range(start_year, end_year + 1):

        year_facts = [
            item
            for item in candidates
            if item["fy"] == fy
        ]

        if not year_facts:
            continue

        duration_facts = [
            item for item in year_facts
            if "start" in item
        ]

        instant_facts = [
            item for item in year_facts
            if "start" not in item
        ]

        if duration_facts:

            annual_candidates = []

            for item in duration_facts:
                start = date.fromisoformat(item["start"])
                end = date.fromisoformat(item["end"])

                duration_days = (end - start).days

                if 300 <= duration_days <= 400:
                    annual_candidates.append(item)

            if not annual_candidates:
                continue

            annual = max(
                annual_candidates,
                key=lambda item: item["end"]
            )

        else:
            instant_candidates = [
                item for item in year_facts
                if "start" not in item
            ]

            if not instant_candidates:
                continue

            annual = max(
                instant_candidates,
                key=lambda item: item["end"]
            )

        annual_facts.append(annual)

    return annual_facts

def get_original_annual_fact(
    data,
    concept,
    start_year=2015,
    end_year=2025
):
    facts = data["facts"]["us-gaap"][concept]["units"]["USD"]

    records = []

    for fact in facts:
        if fact.get("form") != "10-K":
            continue

        fy = fact.get("fy")
        end = fact.get("end")

        if fy is None or end is None:
            continue

        if start_year <= fy <= end_year:
            records.append({
                "year": fy,
                "end": end,
                "value": fact["val"],
                "filed": fact.get("filed"),
                "accn": fact.get("accn")
            })

    return pd.DataFrame(records)

def get_annual_fact(data,concept, year):
    facts = data["facts"]["us-gaap"][concept]["units"]["USD"]

    start = f"{year}-01-01"
    end = f"{year}-12-31"
    filing_year = year + 1

    matches = [
        f for f in facts
        if f.get("start") == start
        and f.get("end") == end
        and f.get("form") == "10-K"
        and f.get("filed", "").startswith(str(filing_year))
    ]

    if not matches:
        return np.nan

    return matches[-1]["val"]

def get_annual_instant_fact(data, concept, year):
    facts = data["facts"]["us-gaap"][concept]["units"]["USD"]

    end = f"{year}-12-31"
    filing_year = year + 1

    matches = [
        f for f in facts
        if f.get("end") == end
        and f.get("form") == "10-K"
        and f.get("filed", "").startswith(str(filing_year))
    ]

    if not matches:
        return np.nan

    return matches[-1]["val"]

def extract_annual_concept(us_gaap, concept_name, output_name):
    facts = us_gaap[concept_name]["units"]["USD"]
    result = pd.DataFrame(facts)

    # Keep full-year 10-K observations
    result = result[
        (result["form"] == "10-K") &
        (result["fp"] == "FY") &
        (result["end"].str.endswith("-12-31"))
    ].copy()

    result["year"] = pd.to_datetime(result["end"]).dt.year

    # Keep 2021–2025 and the latest filing for each year
    result = result[result["year"].between(2021, 2025)]
    result = (
        result.sort_values("filed")
        .drop_duplicates(subset="year", keep="last")
        .sort_values("year")
    )

    result[output_name] = result["val"] / 1e9

    return result.reindex(
         columns=["year", output_name, "filed", "start", "end"]
    )

def extract_annual_fact(us_gaap, concept, years=range(2021, 2026)):
    facts = us_gaap[concept]["units"]["USD"]

    fact_df = pd.DataFrame(facts)

    # Select fiscal-year 10-K facts with December 31 year-end
    fact_df = fact_df[
        (fact_df["form"] == "10-K")
        & (fact_df["fp"] == "FY")
        & (fact_df["end"].str.endswith("-12-31"))
    ].copy()

    fact_df["year"] = pd.to_datetime(fact_df["end"]).dt.year

    # Keep the requested reporting years
    fact_df = fact_df[fact_df["year"].isin(years)]

    # Keep the latest filing for each year
    fact_df = (
        fact_df.sort_values("filed")
        .drop_duplicates(subset="year", keep="last")
    )

    return fact_df[["year", "end", "val", "filed"]].sort_values("year")

