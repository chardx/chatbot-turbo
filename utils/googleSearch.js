export const processGoogleSearch = async (prompt) => {
    try {
        const response = await fetch('http://localhost:3000/api/google', {
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
            isImage: false
        }

    } catch (error) {
        console.log(error)
    }



}