import AWS from "aws-sdk";


const polly = new AWS.Polly({
    signatureVersion: "v4",
    region: "us-west-2",
    accessKeyId: import.meta.env.VITE_AWS_POLLY_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_POLLY_SECRET_ACCESS_KEY,
});

export const processTextToSpeech = async (message, activeVoice) => {


    try {
        const params = {
            OutputFormat: "mp3",
            Text: message,
            VoiceId: activeVoice,
            Engine: "neural",
        };
        const data = await polly.synthesizeSpeech(params).promise();
        const audioSrc = `data:audio/mp3;base64,${data.AudioStream.toString(
            "base64"
        )}`;
        return audioSrc;
    } catch (error) {
        console.log(error);
    }
};
