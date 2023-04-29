import FormData from 'form-data';
import axios from 'axios'

let audioChunks = [];
export const startRecording = async () => {
    let recorder = MediaRecorder;
    console.log("start");
    console.log(recorder);

    const onRecordingDataAvailable = (e) => {
        console.log("dataavailable", e.data.size);

    };

    const onRecordingStop = () => {
        console.log("stop");
        const cleanup = () => {

        };

        if (submitNextAudio) {
            const blob = new Blob(audioChunks, { type: "audio/webm" });
            console.log(blob);
            sendAudioData(blob).then(cleanup, cleanup);
        } else {
            cleanup();
        }
    };

    console.log("Recorder is: " + recorder);
    if (!recorder) {
        try {
            if ("MediaRecorder" in window) {
                console.log("MediaRecorder is supported")
            }
            else {
                console.log("MediaRecorder is not supported")
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            let options = { mimeType: "audio/webm" };

            const workerOptions = {
                WebMOpusEncoderWasmPath:
                    "https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/WebMOpusEncoder.wasm",
            };

            recorder = new window.MediaRecorder(
                stream,
                options,
                workerOptions
            );

            recorder.addEventListener("dataavailable", onRecordingDataAvailable);
            recorder.addEventListener("stop", onRecordingStop);


        } catch (err) {
            console.error("Error initializing recorder:", err);
            return;
        }
    }

    console.log("Starting recording...", recorder);
    console.log(recorder.state);
    recorder.start();

};


export const processWhisperSTT = async () => {

    const sampleMp3 = "../src/assets/audio/baby.mp3";
    console.log("sample mp3:" + sampleMp3)
    const apiUrl = "https://api.openai.com/v1/audio/transcriptions";
    const API_KEY = import.meta.env.VITE_API_KEY;

    console.log(API_KEY)

    const formData = new FormData();
    const mp3Blob = await fetch(sampleMp3).then((res) => res.blob());
    console.log(mp3Blob)
    formData.append("file", mp3Blob, "sample.mp3");
    formData.append("model", "whisper-1");

    try {

        const response = await axios.post(apiUrl, formData, {

            headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-type": "multipart/form-data"
            },


        });
        console.log(`response: ${response}`)

        return response.data.text;

    } catch (error) {
        console.log(error)
    }
    /*
    curl --request POST \
      --url https://api.openai.com/v1/audio/transcriptions \
      --header 'Authorization: Bearer TOKEN' \
      --header 'Content-Type: multipart/form-data' \
      --form file=@/path/to/file/openai.mp3 \
      --form model=whisper-1
      */
}