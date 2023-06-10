export const processTalkWithDocs = async (messages) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/documentLoader`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ messages }),

        });

        const data = await response.json();
        console.log("Data")
        console.log(data)
        /* Return GPT Response */
        // // Remove trailing punctuation

        console.log(data.results.text);
        return {
            message: data.results.text,
            sender: "ChatGPT"
        }

    } catch (error) {
        console.log(error)
    }

}