
const voices = ['ErXwobaYiN019PkySvjV', 'EXAVITQu4vr4xnSDxMaL'];
const ttsHeaders = {
  Accept: "audio/mpeg",
  "xi-api-key": key,
  "Content-Type": "application/json",
};

const BASE_URL = "https://api.elevenlabs.io/v1";


export const processTextToSpeech11Labs = async (text, voiceIndex = 0) => {
  const ttsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voices[voiceIndex]}`;
  const message = { text };
  try {
    const response = await fetch(ttsUrl, message, { headers: ttsHeaders });
    if (response.status === 200) {
      const audioUrl = URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
      // const audioSrc = `data:audio/mp3;base64,${audioUrl.toString(
      //   "base64"
      // )}`;
      // const sound = new Howl({
      //   src: audioUrl,
      //   format: 'mp3',
      //   onend: function () {
      //     URL.revokeObjectURL(audioUrl);
      //   }
      // });
      // sound.play();
      console.log("audio SRC: " + audioUrl)
      return audioUrl;
    } else {
      console.log(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}


export const genAudio = async ({
  text,
  voiceIndex = 0,

}) => {
  try {
    const response = await fetch(`${BASE_URL}/text-to-speech/${voices[voiceIndex]}`, {
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
