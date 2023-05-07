import { SSE } from "sse";


const API_KEY = import.meta.env.VITE_API_KEY


const setupActiveAIRole = async (activeAI) => {



    // this returns an object format that is only accepted by OpenAI API
    return {
        role: "system",
        content: activeAI.content
    }
}

export const processMessageToChatGPT = async (chatMessages, activeAI) => {
    let result;

    const systemMessage = await setupActiveAIRole(activeAI);
    // role: user or assistant
    let apiMessages = chatMessages.map((messageObject) => {
        let role = messageObject.role === "ChatGPT" ? "assistant" : "user";

        return { role, content: messageObject.message };
    });

    let url = 'https://api.openai.com/v1/chat/completions'
    const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [
            systemMessage, // The system message DEFINES the logic of our chatGPT
            ...apiMessages, // The messages from our chat with ChatGPT
        ],
        stream: true
    };
    try {

        let source = new SSE(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            method: "POST",
            payload: JSON.stringify(apiRequestBody),
        });

        source.addEventListener("message", (e) => {
            if (e.data != "[DONE]") {

                let payload = JSON.parse(e.data);

                let text = payload.choices[0].delta.content;

                if (text != "\n") {
                    result = result + text;
                    console.log("Result: " + result);

                    // setResult(resultRef.current);
                }
            } else {
                console.log(e.data);
                source.close();
            }
        });

        source.addEventListener("readystatechange", (e) => {
            if (e.readyState >= 2) {
                // setIsLoading(false);
            }
        });

        source.stream();

        //Streaming disabled - for future reference
        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         Authorization: "Bearer " + API_KEY,
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(apiRequestBody),
        // });


        // const data = await response.json()
        // /* Return GPT Response */
        // console.log(data.choices[0].message.content);
        // return {
        //     message: data.choices[0].message.content,
        //     sender: "ChatGPT",
        // }
    } catch (error) {
        console.log(error);
    }
};