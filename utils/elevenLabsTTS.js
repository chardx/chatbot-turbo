import axios from 'axios';

const voices = ['ErXwobaYiN019PkySvjV', 'EXAVITQu4vr4xnSDxMaL'];
const ttsHeaders = {
  'Content-Type': 'application/json',
  'xi-api-key': import.meta.env.VITE_ELEVEN_LABS_API_KEY
};

export const processTextToSpeech11Labs = async (text, voiceIndex = 0) => {
  const ttsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voices[voiceIndex]}`;
  const message = { text };
  try {
    const response = await axios.post(ttsUrl, message, { headers: ttsHeaders });
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
