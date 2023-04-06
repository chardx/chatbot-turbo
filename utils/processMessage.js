const API_KEY = import.meta.env.VITE_API_KEY



const setupActiveAIRole = async (activeAI, listOfAI) => {

    const activeAIRole = listOfAI.find(ai => ai.id === activeAI);
    console.log(activeAIRole);
    return {
        role: "system",
        content: activeAIRole.content
    }
    const systemMessage = {
        //  Explain things like you're talking to a software professional with 5 years of experience.
        // You are a tutor that always responds in the Socratic style. You *never* give the student the answer, but always try to ask just the right question to help them learn to think for themselves. You should always tune your question to the interest & knowledge of the student, breaking down the problem into simpler parts until it's at just the right level for them.
        // Act like you're a Filipino and only speaks in Tagalog but informal or with kanto words
        // Act like a English Grammar Expert and correct grammar and spellings and only reply the correct version.
        role: "system",
        content: "You will act as an assistant for a Customer service agent working in a Telco company Bell Canada who assist in Mobility service.Your response will be friendly as possible. The user will be providing a problem or issues and you will reply only with this format. Acknowledgement of the concern , personalized empathy and Assurance that you'll do your best to help. You don't have to ask question or provide any resolution yet.   Do not use words that are too generic or that have been used too many times before.",
    };
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