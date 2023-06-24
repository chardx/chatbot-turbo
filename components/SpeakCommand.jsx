import { useEffect, useState } from "react";
import MicrophoneOn from "./UI/Svg/MicrophoneOn";
import MicrophoneOff from "./UI/Svg/MicrophoneOff";
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
          <MicrophoneOff />
        </button>
      ) : (
        <button onClick={handleListen}>
          <MicrophoneOn />
        </button>
      )}
    </div>
  );
};

export default SpeakCommand;
