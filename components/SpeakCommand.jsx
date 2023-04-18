import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeakCommand = ({ promptInputRef }) => {
  const [text, setText] = useState("");
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  
  const handleListen = () => {
    console.log("hey");
    setMicrophoneOn(true);
    SpeechRecognition.startListening();
  };

  const handleStop = () => {
    setMicrophoneOn(false);

    setText(transcript);
    promptInputRef.current.value = transcript;
    console.log(transcript);
    resetTranscript();

    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    console.log(microphoneOn);
  }, [microphoneOn]);
  return (
    <div>
      <button onClick={handleStop}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button onClick={handleListen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SpeakCommand;
