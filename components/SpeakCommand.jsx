import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import * as OpusRecorder from "../functions/whisper";

const SpeakCommand = ({ promptInputRef, handleSend }) => {
  const [text, setText] = useState("");
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleListen = () => {
    if (!listening) {
      setMicrophoneOn(true);
      SpeechRecognition.startListening();
    } else {
      setMicrophoneOn(false);
      SpeechRecognition.stopListening();
    }
  };

  const handleStop = () => {
    setMicrophoneOn(false);

    setText(transcript);
    promptInputRef.current.value = transcript;
    // Automatic Submit
    handleSend();
    console.log(transcript);
    resetTranscript();

    SpeechRecognition.stopListening();
  };

  const handleSampleWhisper = async () => {
    const result = await OpusRecorder.startRecording();
    console.log(result);
  };

  useEffect(() => {
    console.log(microphoneOn);
    console.log("listening: " + listening);
  }, [microphoneOn]);
  return (
    <div>
      {microphoneOn ? (
        <button onClick={handleStop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 sm:w-12 sm:h-12 text-red-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
            />
          </svg>
        </button>
      ) : (
        <button onClick={handleListen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 sm:w-12 sm:h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SpeakCommand;
