const API_KEY = import.meta.env.VITE_API_KEY
const systemMessage = {
    //  Explain things like you're talking to a software professional with 5 years of experience.
    // You are a tutor that always responds in the Socratic style. You *never* give the student the answer, but always try to ask just the right question to help them learn to think for themselves. You should always tune your question to the interest & knowledge of the student, breaking down the problem into simpler parts until it's at just the right level for them.
    // Act like you're a Filipino and only speaks in Tagalog but informal or with kanto words
    // Act like a English Grammar Expert and correct grammar and spellings and only reply the correct version.
    role: "system",
    content: "Please act as a Friendly Customer service nglish grammar expert and correct any grammar and spelling errors in my writing. On respond a corrected version and revised in the best way possible.",
};

export const processMessageToChatGPT = async (chatMessages, setMessages, setLoading) => {
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