import time
import requests
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

PERSONAL_TOKEN = os.getenv('PERSONAL_TOKEN')

# Define API key
headers = {
    "Personal-Token": PERSONAL_TOKEN,
    "Content-Type": "application/json",
}

# Define endpoint
url = "https://api.opencollective.com/graphql/v2"

# Define host slugs
hosts = ["europe", "foundation", "opensource"]

# Define expense types
expense_types = ["INVOICE", "RECEIPT", "CHARGE"]

# Initialize list to store data
data_list = []

# Initialize error counter
error_counter = 0

# Loop through each host
for host in hosts:
    # Loop through each expense type
    for expense_type in expense_types:
        # Initialize offset
        offset = 0
        while True:  
            try:
                query = """
                query searchExpenses(
                        $host: AccountReferenceInput, 
                        $status: ExpenseStatusFilter,
                        $limit: Int, 
                        $offset: Int,
                        $type: ExpenseType
                        ) 
                {
                    expenses(host: $host, limit: $limit, offset: $offset, status: $status, type: $type) {
                      limit
                      offset
                      totalCount
                      nodes {
                        id
                        type
                        amountV2(currencySource: ACCOUNT) {
                          valueInCents
                        }
                      }
                    }
                }
                """
                variables = {
                    "host": {"slug": host},
                    "limit": 1000,
                    "offset": offset,
                    "status": "PAID",
                    "type": expense_type
                }
                # Send the request
                response = requests.post(url, json={'query': query, 'variables': variables}, headers=headers)
                response.raise_for_status()  # This will raise an exception if the response contains an HTTP error status
                data = response.json()

                # Append expenses to data list
                expenses_nodes = data.get('data', {}).get('expenses', {}).get('nodes', [])
                for expense in expenses_nodes:
                    data_list.append({"host": host, "valueInCents": expense['amountV2']['valueInCents'], "type": expense['type'], "id": expense['id']})

                print(f'Progress: {offset + len(expenses_nodes)}/{data["data"]["expenses"]["totalCount"]} expenses of type {expense_type} fetched for host {host}')
                error_counter = 0  # Reset error counter after successful request

            except requests.HTTPError as err:
                error_counter += 1
                print(f"Error: {err}. Attempt: {error_counter}")
                if error_counter >= 3:
                    print("Too many consecutive errors. Ending the script.")
                    exit(1)
                time.sleep(60)  # Wait for 1 minute after a failed request


            # Check if we have fetched all expenses
            if len(expenses_nodes) < 1000:
                break  # Break the loop when all expenses are fetched

            offset += 1000  # Increase the offset by 1000
            time.sleep(10)  # Wait for 10 seconds before making the next request

        # Wait for 1 minute between every expense type
        time.sleep(60)

    # Wait for 1 minute between every host
    time.sleep(60)

# Convert data list to dataframe
df = pd.concat([pd.DataFrame([i]) for i in data_list], ignore_index=True)

# Save dataframe to CSV
df.to_csv("expenses.csv", index=False)
