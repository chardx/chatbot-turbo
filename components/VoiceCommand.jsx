import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { textToSpeechActions } from "../store/textToSpeech";
import { processTextToSpeech } from "../utils/processTextToSpeech";
import { processTextToSpeech11Labs } from "../utils/elevenLabsTTS";
const VoiceCommand = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const textToSpeech = useSelector((state) => state.textToSpeech.text);
  const audioUrl = useSelector((state) => state.textToSpeech.audioUrl);
  const activeAI = useSelector((state) => state.ai.activeAI);
  const aiRoles = useSelector((state) => state.ai.aiRoles);

  const dispatch = useDispatch();
  const audioRef = useRef();

  //get active Voice
  const activeVoice = useMemo(
    () => aiRoles.find((voice) => voice.id === activeAI).voice,
    [activeAI]
  );

  useEffect(() => {
    console.log("I got called");
    const getAudioSrc = async () => {
      const audioSrc = await processTextToSpeech(textToSpeech, activeVoice);

      // TODO: Eleven Labs Implementation
      // const audioSrc = await processTextToSpeech(textToSpeech);
      console.log("I am audio src: " + audioSrc);
      return audioSrc;
    };

    const audioSrc = getAudioSrc();
    audioSrc.then((src) => {
      dispatch(textToSpeechActions.updateAudioUrl(src));
    });
  }, [textToSpeech]);

  useEffect(() => {
    console.log("First Render");
  }, []);

  useEffect(() => {
    if (audioUrl) {
      console.log(audioUrl);
      playAudio();
    } else {
      console.log("No audio url");
    }
    //clean up function
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [audioUrl]);

  const playAudio = () => {
    audioRef.current.play();
  };
  return (
    <div className="text-black w-12">
      <audio
        controls
        src={audioUrl}
        ref={audioRef}
        style={{ display: "none" }}
      ></audio>

      <button onClick={playAudio}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      </button>
    </div>
  );
};

export default VoiceCommand;
