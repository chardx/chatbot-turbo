import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: import.meta.env.VITE_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const processImage = async (prompt, chatMessages, setMessages, setLoading) => {

    const response = await openai.createImage({
        prompt: `${prompt}`,
        n: 1,
        size: "512x512",
    });

    //Add a modified Chat GPT response regarding the image
    setMessages([
        ...chatMessages,
        {
            message: `Here's the image requested with description ${prompt}`,
            sender: "ChatGPT",
            isImage: true,
            image: response.data.data[0].url,
            alt: { prompt }
        },
    ]);
    setLoading(false);

    const image_url = response.data.data[0].url;
    console.log(image_url);

    return image_url;
};