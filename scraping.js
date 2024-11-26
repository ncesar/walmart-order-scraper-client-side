(async function () {
    try {
        // Extract cookies from the browser
        const cookies = document.cookie;

        if (!cookies) {
            throw new Error("No cookies found. Please ensure you are logged in.");
        }

        const headers = {
            accept: "application/json",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US",
            cookie: cookies,
            "user-agent": navigator.userAgent,
            "x-apollo-operation-name": "PurchaseHistoryV2",
            "x-o-gql-query": "query PurchaseHistoryV2",
            "x-o-bu": "WALMART-US",
            "x-o-ccm": "server",
            wm_mp: "true",
            wm_page_url: "https://www.walmart.com/orders", // this can be flexibel and changed
            referer: "https://www.walmart.com/orders", // this can be flexibel and changed
            "x-o-platform": "rweb",
            "x-o-platform-version": "us-web-1.171.4-22e8dcfe70ac4c2a97ebec1ee1cf1bdff5c8ff5d-112018",
            "x-o-segment": "oaoh",
            "x-enable-server-timing": "1",
            "x-latency-trace": "1",
            baggage: "trafficType=customer,deviceType=desktop,renderScope=CSR,webRequestSource=Browser,pageName=trackYourOrder,isomorphicSessionId=fXoQYtsPqo0VKS_FVdJjQ", // Example baggage
        };

        // template literals for readability
        const endpointUrl = `https://www.walmart.com/orchestra/cph/graphql/PurchaseHistoryV2/39bf8cc458f3e0772c97a3a93f60be012b9070f30fe54d834179fa54a3edc8a0?variables=${encodeURIComponent(
            JSON.stringify({
                input: {
                    cursor: "",
                    search: "",
                    filterIds: [],
                    limit: 5,
                    type: null,
                    minTimestamp: null,
                    maxTimestamp: null,
                },
                platform: "WEB",
            })
        )}`;

        const response = await fetch(endpointUrl, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch purchase history: ${response.status} ${response.statusText}`);
        }

        const purchaseHistory = await response.json();

        if (!purchaseHistory || !purchaseHistory.data || !purchaseHistory.data.orderHistoryV2) {
            throw new Error("Unexpected response structure. Please verify the API endpoint and response format.");
        }

        const { banners, filterGroups, orderGroups, wPlusMembershipStatus } =
            purchaseHistory.data.orderHistoryV2;

        console.log("Purchase History Details:");
        console.log("Filter Groups:");
        filterGroups.forEach((group) => {
            console.log(`- ${group.title} (${group.label}):`);
            if (group.singleChoiceFilters) {
                group.singleChoiceFilters.forEach((filter) =>
                    console.log(`  - ${filter.label} (ID: ${filter.id})`)
                );
            }
            if (group.multipleChoiceFilters) {
                group.multipleChoiceFilters.forEach((filter) =>
                    console.log(`  - ${filter.label} (ID: ${filter.id})`)
                );
            }
            if (group.toggleFilter) {
                console.log(`  - ${group.toggleFilter.label} (ID: ${group.toggleFilter.id})`);
            }
        });
        console.log("Orders:", orderGroups);
    } catch (error) {
        console.error("Error fetching purchase history:", {
            error: error.message,
            endpointUrl,
            headers,
        });
    }
})();
