def calculate_assets_materiality(df):
    """
    Calculate preliminary materiality using 1% of total assets.
    """
    result = df.copy()

    result["assets_1pct"] = result["total_assets"] * 0.01

    return result

def calculate_pbt_materiality(df):
    """
    Calculate preliminary materiality using 5% of current-year
    profit before tax. Returns NaN when profit before tax is
    zero or negative.
    """
    result = df.copy()
    result["pbt_5pct"] = (
        result["profit_before_tax"]
        .where(result["profit_before_tax"] > 0)
        * 0.05
    )
    return result

def calculate_average_pbt_materiality(df):
    """
    Calculate preliminary materiality using 5% of the
    three-year average profit before tax.
    """
    result = df.copy()

    avg_pbt = result["profit_before_tax"].rolling(
        window=3,
        min_periods=3
    ).mean()

    result["pbt_3yr_avg_5pct"] = avg_pbt.where(avg_pbt > 0) * 0.05

    return result