const API_KEY = import.meta.env.VITE_API_KEY

const setupActiveAIRole = async (activeAI, listOfAI) => {



    // this returns an object format that is only accepted by OpenAI API
    return {
        role: "system",
        content: activeAI.content
    }
}

export const processMessageToChatGPT = async (chatMessages, activeAI, listOfAI) => {

    const systemMessage = await setupActiveAIRole(activeAI, listOfAI);
    // role: user or assistant
    let apiMessages = chatMessages.map((messageObject) => {
        let role = messageObject.role === "ChatGPT" ? "assistant" : "user";

        return { role, content: messageObject.message };
    });

    const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [
            systemMessage, // The system message DEFINES the logic of our chatGPT
            ...apiMessages, // The messages from our chat with ChatGPT
        ],
    };
    try {

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        });
        const data = await response.json()
        /* Return GPT Response */
        console.log(data.choices[0].message.content);
        return {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
        }
    } catch (error) {
        console.log(error);
    }
};