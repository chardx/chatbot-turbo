import { SSE } from 'sse';
import { get_current_weather } from '../functions/openAIFunctions/getCurrentWeather';
import { get_clothing_recommendations } from '../functions/openAIFunctions/getClothingRecommendations';
import { process_text_to_image } from '../functions/openAIFunctions/processTextToImage';

import { streamResponseActions } from '../store/stream';
const API_KEY = import.meta.env.VITE_API_KEY;

export const startOpenAIStream = async (url, apiRequestBody, dispatch) => {
    return new Promise((resolve, reject) => {
        let result = '';
        let finished_reason;
        let function_call;
        let function_call_result;
        let func_call = {
            name: null,
            arguments: ""
        };
        let function_response = "";
        let source;


        source = new SSE(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
            method: 'POST',
            payload: JSON.stringify(apiRequestBody),
        });


        source.addEventListener('message', async (e) => {
            dispatch(streamResponseActions.updateStreamStatus('streaming'));
            // console.log("Define property")
            // console.log(get_current_weather.description)
            if (e.data != '[DONE]') {
                let payload = JSON.parse(e.data);
                let text = payload.choices[0].delta.content || undefined;
                let delta = payload.choices[0].delta;
                finished_reason = payload.choices[0].finish_reason;

                if (delta.hasOwnProperty("function_call")) {
                    if (delta.function_call.hasOwnProperty("name")) {
                        func_call.name = delta.function_call.name;
                        console.log("func_call.name")
                        console.log(func_call.name)
                    }

                    if (delta.function_call.hasOwnProperty("arguments")) {
                        func_call.arguments += delta.function_call.arguments;
                    }
                }



                if (text != undefined) {
                    result += text;
                    dispatch(streamResponseActions.updateStreamResponse(result));
                }
            } else {
                console.log("finished_reason")
                console.log(finished_reason)
                if (finished_reason === "function_call") {
                    // function call here using func_call
                    console.log("func_call")
                    console.log(func_call)

                    console.log("func_call.arguments")
                    console.log(JSON.parse(func_call.arguments))
                    const function_name = func_call.name;
                    const function_arguments = JSON.parse(func_call.arguments);

                    switch (function_name) {
                        case "get_current_weather":
                            let weatherArgs = function_arguments;
                            function_response = get_current_weather(
                                weatherArgs.location,
                                weatherArgs.unit
                            );
                            break;
                        case "get_clothing_recommendations":
                            let recommendationArgs = function_arguments;
                            function_response = get_clothing_recommendations(
                                recommendationArgs.temperature
                            );
                            break;
                        case "process_text_to_image":
                            let promptArgs = function_arguments;
                            function_response = await process_text_to_image(
                                promptArgs.prompt
                            );
                            break;
                        default:
                            throw new Error(`Unsupported function: ${function_name}`);
                    }


                    apiRequestBody.messages.push({
                        role: "function",
                        name: function_name,
                        content: function_response,
                    });
                    console.log("apiRequestBody.messages")
                    console.log(apiRequestBody)
                    source.close();
                    resolve({ status: 'incomplete', result: '' });
                }
                else {

                    console.log("result");
                    console.log(result)
                    dispatch(streamResponseActions.updateStreamStatus('stopped'));
                    // resolve(result);
                    source.close();
                    resolve({ status: 'complete', result });
                }
            }
        });

        source.addEventListener("readystatechange", (e) => {
            if (e.readyState >= 2) {
                console.log("readyState >= 2", e.readyState);
                dispatch(streamResponseActions.updateStreamStatus('idle'));
            }
        });


        source.stream();
    })
};
