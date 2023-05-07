import { useState, useEffect } from 'react';
import { SSE } from 'sse';
import { useDispatch } from 'react-redux';
import { streamResponseActions } from '../store/stream';
import { useSelector } from 'react-redux';
const API_KEY = import.meta.env.VITE_API_KEY;

const setupActiveAIRole = async (activeAI) => {
    // this returns an object format that is only accepted by OpenAI API
    return {
        role: "system",
        content: activeAI.content
    }
}
const streamChatGPT = async (chatMessages, activeAI, dispatch) => {
    let result = '';


    const systemMessage = await setupActiveAIRole(activeAI);
    console.log("hoy pinoy ako")
    console.log(chatMessages)
    let apiMessages = chatMessages.map((messageObject) => {

        let role = messageObject.sender === 'ChatGPT' ? 'assistant' : 'user';

        return { role, content: messageObject.message };
    });
    let url = 'https://api.openai.com/v1/chat/completions';
    console.log(apiMessages)
    console.log(systemMessage)
    const apiRequestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
            systemMessage,
            ...apiMessages,
        ],
        stream: true,
    };

    return new Promise((resolve, reject) => {
        try {
            let source = new SSE(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
                method: 'POST',
                payload: JSON.stringify(apiRequestBody),
            });

            source.addEventListener('message', (e) => {
                dispatch(streamResponseActions.updateStreamStatus('streaming'));

                if (e.data != '[DONE]') {
                    let payload = JSON.parse(e.data);
                    let text = payload.choices[0].delta.content;

                    if (text != '\n' && text != undefined) {
                        result = result + text;
                        dispatch(streamResponseActions.updateStreamResponse(result));


                    }
                } else {
                    dispatch(streamResponseActions.updateStreamStatus('stopped'));
                    resolve(result);
                    source.close();
                }
            });

            source.addEventListener("readystatechange", (e) => {
                if (e.readyState >= 2) {
                    console.log("readyState >= 2", e.readyState);
                    dispatch(streamResponseActions.updateStreamStatus('idle'));
                }
            });

            source.stream();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

export const useChatGPT = () => {
    // const [response, setResponse] = useState('');
    // console.log(chatMessages);
    const response = useSelector(state => state.stream.streamResponse);
    const dispatch = useDispatch();

    const startChatStream = async (chatMessages, activeAI) => {
        const result = await streamChatGPT(chatMessages, activeAI, dispatch);
        return {
            message: result,
            sender: "ChatGPT"
        }
    };

    return [response, startChatStream];


};
