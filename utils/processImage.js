import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: import.meta.env.VITE_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const processImage = async (prompt) => {
    try {
        const response = await openai.createImage({
            prompt: `${prompt}`,
            n: 1,
            size: "512x512",
        });

        return {
            message: `Here's the image requested with description ${prompt}`,
            sender: "ChatGPT",
            isImage: true,
            image: response.data.data[0].url,
            alt: { prompt }
        }
    } catch (error) {
        console.log(error)
    }

};