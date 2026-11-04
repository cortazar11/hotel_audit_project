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
    Calculate long-term debt and lease obligations relative to
    revenue and operating cash flow.

    Debt to revenue is expressed as a percentage (%).
    Debt to operating cash flow is expressed as a multiple (x).
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
    Calculate debt and revenue growth rates between consecutive rows,
    and the difference between their growth rates.

    Note: Growth rates compare consecutive observations, not necessarily
    consecutive years if some years are missing.
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

def calculate_distribution_coverage(df):
    """
    Calculate shareholder distributions relative to operating cash flow
    and the difference between the two.
    """
    result = df.copy()

    result["distributions_pct_cfo"] = (
        result["total_distributions_usd_bn"]
        / result["cfo_usd_bn"]
        * 100
    )

    result["distribution_cfo_gap_usd_bn"] = (
        result["total_distributions_usd_bn"]
        - result["cfo_usd_bn"]
    )

    return result

def calculate_interest_coverage(df):
    """
    Calculate operating income relative to interest expense.
    """
    result = df.copy()

    result["interest_coverage_ratio"] = (
        result["operating_income_bn"]
        / result["interest_expense_bn"]
    )

    return result

def calculate_debt_to_operating_income(df):
    """
    Calculate long-term debt and lease obligations relative
    to operating income.

    Debt is expressed in USD; operating income in USD billions.
    """
    result = df.copy()

    result["debt_to_operating_income"] = (
        result["long_term_debt_and_leases"]
        / (result["operating_income_bn"] * 1e9)
    )

    return result

def calculate_cfo_to_current_liabilities(df):
    """
    Calculate operating cash flow relative to current liabilities.
    """
    result = df.copy()

    result["cfo_to_current_liabilities"] = (
        result["operating_cash_flow_bn"]
        / result["current_liabilities_bn"]
    )

    return result

def calculate_current_maturities_pct(df):
    """
    Calculate current debt maturities as a percentage of total debt.
    """
    result = df.copy()

    result["current_maturities_pct"] = (
        result["current_maturities_bn"]
        / result["total_debt_and_leases_bn"]
        * 100
    )

    return result

def calculate_cfo_to_current_maturities(df):
    """
    Calculate operating cash flow relative to current debt maturities.
    """
    result = df.copy()

    result["cfo_to_current_maturities"] = (
        result["operating_cash_flow_bn"]
        / result["current_maturities_bn"]
    )

    return result

def calculate_cash_after_distributions(df):
    """
    Calculate operating cash flow remaining after shareholder distributions.
    """
    result = df.copy()

    result["cfo_after_distributions_usd_bn"] = (
        result["operating_cash_flow_usd_bn"]
        - result["total_distributions_usd_bn"]
    )

    return result