# walmart-order-scraper-client-side

This script retrieves purchase history details from Walmart's API using a predefined endpoint. The response is parsed and logged to the console in a user-friendly format, providing insights into banners, filter groups, order groups, and membership status.

---

## How It Works

1. **Cookies Extraction**:
   - Retrieves cookies from the browser using `document.cookie`.

2. **Headers Construction**:
   - Builds the required headers for the request, including authentication and platform-specific metadata.

3. **API Request**:
   - Sends a GET request to a hardcoded Walmart API endpoint using the `fetch` API.

4. **Response Validation**:
   - Checks if the response is structured as expected and throws an error if it's not.

5. **Data Parsing and Logging**:
   - Parses the API response and logs the following:
     - **Banners**
     - **Filter Groups**:
       - Single choice filters
       - Multiple choice filters
       - Toggle filters
     - **Order Groups**

6. **Error Handling**:
   - Logs detailed error information, including the request headers and endpoint URL, to assist in debugging.

---

## Prerequisites

- **Authentication**: You must be logged into Walmart's website to ensure valid cookies are available.
- **Browser Environment**: This script relies on `document.cookie` and `navigator.userAgent`, so it should be run in a browser.

---

## How to Use

1. Copy the script into your browser's developer console.
2. Run the script.
3. Check the console for the purchase history details, logged in a structured format.

---

## Expected Output

The script outputs the purchase history data to the console. For example:

```plaintext
Purchase History Details:
Banners: []
Filter Groups:
- Filter by date (By date):
  - Last 3 months (ID: last-3-months)
  - Last 6 months (ID: last-6-months)
  - 2024 (ID: year-0)
  - 2023 (ID: year-1)
  - 2022 (ID: year-2)
  - 2021 (ID: year-3)
  - 2020 (ID: year-4)
- Filter by returned status (Returns):
  - Returns (ID: returned)
- Find all in-store purchases (In store):
  - In store (ID: in-store)
- Filter by order status (Status):
  - In progress (ID: in-progress)
  - Completed (ID: completed)
Order Groups: []

