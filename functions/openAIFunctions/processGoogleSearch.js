export const process_google_search = async (prompt) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/google`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ prompt }),

        });

        const data = await response.json();

        /* Return GPT Response */
        return JSON.stringify({

            searchResults: data.results
        });

    } catch (error) {
        console.log(error)
    }

}


Object.defineProperty(process_google_search, "property", {
    get: () => ({
        name: "process_google_search",
        description: "Search Google for updated information beyond Open AI knowledge cut off",
        parameters: {
            type: "object",
            properties: {
                searchString: {
                    type: "string",
                    description: "The search string to look up in Google",
                },

            },
            required: ["searchString"],
        },
    }),
});

