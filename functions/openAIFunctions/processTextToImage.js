export const process_text_to_image = async (prompt) => {
    console.log(`Called process_text_to_image with prompt ${prompt}`);
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/stableDummy`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ prompt }),

        });

        const data = await response.json();
        console.log("Results from server")
        console.log(data.results)
        /* Return GPT Response */
        return JSON.stringify({

            imageUrl: data.results
        });

    } catch (error) {
        console.log(error)
        return JSON.stringify({
            imageUrl: "No Image found"
        })
    }
}


Object.defineProperty(process_text_to_image, "object", {
    get: () => ({
        name: "process_text_to_image",
        description: "Convert a given text prompt to an image",
        parameters: {
            type: "object",
            properties: {
                prompt: {
                    type: "string",
                    description: "The text that describes the image to convert",
                },

            },
            required: ["prompt"],
        },
    }),
});