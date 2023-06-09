export const processGoogleSearch = async (prompt) => {
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
        return {
            message: data.results,
            sender: "ChatGPT",
        }

    } catch (error) {
        console.log(error)
    }



}