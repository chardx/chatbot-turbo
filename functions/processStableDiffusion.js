export const processStableDiffusion = async (prompt) => {
    try {
        const response = await fetch('http://localhost:3000/api/stableDummy', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ prompt }),

        });

        const data = await response.json();

        console.log(data)
        /* Return GPT Response */
        return {
            message: `Here's the image requested with description ${prompt}`,
            sender: "ChatGPT",
            isImage: true,
            image: data.results,
            alt: { prompt }
        }

    } catch (error) {
        console.log(error)
    }



}