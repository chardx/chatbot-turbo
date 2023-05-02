export const generateChatTitle = async (messages) => {
    console.log(prompt)
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
        return data.results

    } catch (error) {
        console.log(error)
    }


}