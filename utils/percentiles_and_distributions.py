import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Read the CSV file
df = pd.read_csv("expenses.csv")

# Percentiles to calculate
percentiles = [.05, .1, .25, .5, .75, .9, .95, .96, .97, .98, .99]

# Initialize list to store results
results = []

# Find the records that are as close as possible to each percentile, max and min
for host in df["host"].unique():
    host_data = df[df["host"] == host]
    for percentile in percentiles:
        target_value = np.percentile(host_data["valueInCents"], percentile * 100)
        closest_value = host_data.iloc[(host_data["valueInCents"] - target_value).abs().argsort()[:1]]
        results.append({"host": host, "percentile": percentile, "expenseId": closest_value["id"].values[0], "valueInCents": closest_value["valueInCents"].values[0]})
    
    # For max
    max_value = host_data["valueInCents"].max()
    expenseId_max = host_data[host_data["valueInCents"] == max_value]["id"].values[0]
    results.append({"host": host, "percentile": 'max', "expenseId": expenseId_max, "valueInCents": max_value})

    # For min
    min_value = host_data["valueInCents"].min()
    expenseId_min = host_data[host_data["valueInCents"] == min_value]["id"].values[0]
    results.append({"host": host, "percentile": 'min', "expenseId": expenseId_min, "valueInCents": min_value})

# Convert results to a DataFrame
results_df = pd.DataFrame(results)

# Save to CSV
results_df.to_csv("closest_to_percentiles.csv", index=False)

# Calculate the percentiles for each host
percentiles_df = df.groupby("host")["valueInCents"].describe(percentiles=percentiles)

# Save the percentiles to a CSV file
percentiles_df.to_csv("percentiles.csv")

# Plot the distribution of valueInCents for each host
# make a copy of the dataframe df called plot_df
plot_df = df.copy()
plot_df["valueInCents"] = plot_df["valueInCents"] / 100

hosts = plot_df["host"].unique()
for host in hosts:
    plt.figure(figsize=(10,6))
    host_data = plot_df[plot_df["host"] == host]["valueInCents"]
    sns.histplot(host_data[host_data <= max_value], kde=True)  # Filter out values above the 99th percentile
    plt.title(f"Distribution of expense amounts in host currency for host {host}")
    plt.xlabel("Amount in host currency")
    plt.ylabel("Frequency")
    plt.savefig(f"{host}_distribution.png")