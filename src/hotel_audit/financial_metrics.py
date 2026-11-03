import pandas as pd


def calculate_growth(df, value_columns):
    """
    Calculate year-over-year growth for the specified columns.
    """
    result = df.copy()

    for column in value_columns:
        result[f"{column}_growth"] = result[column].pct_change()

    return result

def calculate_liquidity_ratios(df):
    """
    Calculate current and cash ratios.
    """
    result = df.copy()

    result["current_ratio"] = (
        result["val_assets"] / result["current_liabilities"]
    )

    result["cash_ratio"] = (
        result["val_cash"] / result["current_liabilities"]
    )

    return result

def calculate_debt_ratios(df):
    """
    Calculate long-term debt and lease obligations
    relative to revenue and operating cash flow.
    """
    result = df.copy()

    result["debt_leases_to_revenue_pct"] = (
        result["long_term_debt_and_leases"]
        / result["revenue"]
        * 100
    )

    result["debt_leases_to_cfo"] = (
        result["long_term_debt_and_leases"]
        / result["operating_cash_flow"]
    )

    return result

def calculate_debt_growth(df):
    """
    Calculate debt and revenue growth rates,
    and the difference between their growth rates.
    """
    result = df.copy()

    result["debt_leases_growth_pct"] = (
        result["long_term_debt_and_leases"].pct_change() * 100
    )

    result["revenue_growth_pct"] = (
        result["revenue"].pct_change() * 100
    )

    result["debt_minus_revenue_growth_pp"] = (
        result["debt_leases_growth_pct"]
        - result["revenue_growth_pct"]
    )

    return result

def calculate_change(df, value_columns):
    """
    Calculate absolute changes between consecutive rows
    for the specified columns.
    """
    result = df.copy()

    for column in value_columns:
        result[f"{column}_change"] = result[column].diff()

    return result