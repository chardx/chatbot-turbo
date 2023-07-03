import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startOpenAIStream } from './startOpenAIStream';
import { get_all_openAIFunctions } from '../functions/openAIFunctions/index.js'


const functionsArray = [
    {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA",
                },
                unit: { type: "string", enum: ["celsius", "fahrenheit"] },
            },
            required: ["location"],
        },
    },
    {
        name: "get_clothing_recommendations",
        description: "Get clothing recommendation based on temperature",
        parameters: {
            type: "object",
            properties: {
                temperature: {
                    type: "string",
                    description: "The current temperature",
                },
            },
            required: ["temperature"],
        },
    },
    {
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
    },

]
const setupActiveAIRole = async (activeAI) => {
    // this returns an object format that is only accepted by OpenAI API
    return {
        role: "system",
        content: activeAI.content
    }
}
const streamChatGPT = async (chatMessages, activeAI, dispatch) => {


    const systemMessage = await setupActiveAIRole(activeAI);
    let apiMessages = chatMessages.map((messageObject) => {

        let role = messageObject.sender === 'ChatGPT' ? 'assistant' : 'user';

        return { role, content: messageObject.message };
    });
    let url = 'https://api.openai.com/v1/chat/completions';
    console.log(apiMessages)
    console.log(systemMessage)
    let apiRequestBody = {
        model: 'gpt-3.5-turbo-0613',
        messages: [
            systemMessage,
            ...apiMessages,
        ],
        functions: functionsArray,
        function_call: "auto",
        stream: true,
    };


    return new Promise(async (resolve, reject) => {
        try {

            let continueLoop = true, ctr = 0;
            do {
                ctr += 1;
                console.log("Loop called : " + ctr)
                const { status, result } = await startOpenAIStream(url, apiRequestBody, dispatch);
                console.log("status and result")
                console.log(status);
                console.log(result);
                if (status === "complete") {
                    resolve(result);
                    continueLoop = false;
                }

            } while (continueLoop)


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
