import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startOpenAIStream } from './startOpenAIStream';
import { functionsArray } from '../functions/openAIFunctions';

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
