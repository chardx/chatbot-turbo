export const generateChatTitle = async (messages) => {
    
    try {
        const response = await fetch('http://localhost:3000/api/generateTitle', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ messages }),

        });

        const data = await response.json();

        console.log(data)
        /* Return GPT Response */
        // // Remove trailing punctuation
        const results = {
            ...data.results,
            text: data.results.text.replace(/[,.;:!?]$/, ""),
        };
        console.log(results);
        return results

    } catch (error) {
        console.log(error)
    }


}