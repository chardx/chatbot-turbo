export const processTalkWithDocs = async (messages) => {

    try {
        const response = await fetch('http://localhost:3000/api/documentLoader', {
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