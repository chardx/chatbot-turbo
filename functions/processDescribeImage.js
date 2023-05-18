export const processDescribeImage = async (imageUrl) => {

    try {
        const response = await fetch('http://localhost:3000/api/describeImage', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ imageUrl }),

        });

        const data = await response.json();
        console.log("Data")
        console.log(data)
        /* Return GPT Response */
        // // Remove trailing punctuation

        console.log(data.results.generated_text);
        return {
            message: data.results.generated_text,
            sender: "ChatGPT"
        }

    } catch (error) {
        console.log(error)
    }

}