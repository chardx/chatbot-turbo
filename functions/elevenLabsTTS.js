
const voices = ['cpMNmC1DKZjVkVOrHcqE', 'c1lHY1mgQ5RZmdn3TYmN'];
const apiKey = import.meta.env.VITE_ELEVEN_LABS_API_KEY
const ttsHeaders = {
  "Accept": "audio/mpeg",
  "xi-api-key": apiKey,
  "Content-Type": "application/json",
};

const BASE_URL = "https://api.elevenlabs.io/v1";

export const genAudio = async ({
  text,
  voice,
  voiceIndex = 1,
}
) => {
  try {

    const response = await fetch(`${BASE_URL}/text-to-speech/${voice}`, {
      method: "POST",
      headers: ttsHeaders,
      body: JSON.stringify({ text }),
    });
    if (!response.ok || !response.body) {
      const readBody = await response.text();
      let message = readBody;
      try {
        const json = JSON.parse(readBody);
        message = json.detail.message;
      } catch (e) { }
      console.error(
        `Network response was not ok ${response.ok} ${message} ${response.status}`
      );
      return undefined;
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getVoices = async () => {
  try {
    const response = await fetch(`${BASE_URL}/voices`, {
      method: "GET",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.voices;
  } catch (error) {
    console.error(error);
    throw error;
  }
};