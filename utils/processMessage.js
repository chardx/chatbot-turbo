const API_KEY = import.meta.env.VITE_API_KEY

const setupActiveAIRole = async (activeAI, listOfAI) => {

    const activeAIRole = listOfAI.find(ai => ai.id === activeAI);
    console.log(activeAIRole);
    // this returns an object format that is only accepted by OpenAI API
    return {
        role: "system",
        content: activeAIRole.content
    }
    
}

export const processMessageToChatGPT = async (chatMessages, setMessages, setLoading, activeAI, listOfAI) => {

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

    await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
    })
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            setMessages([
                ...chatMessages,
                {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT",
                },
            ]);
            setLoading(false);
            console.log(data.choices[0].message.content);

        })
        .catch((error) => console.log(error));
};