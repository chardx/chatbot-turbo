import React, { useState, useMemo, useRef, useEffect } from "react";
import TextToSpeechOn from "./UI/Svg/TextToSpeechOn";
import TextToSpeechOff from "./UI/Svg/TextToSpeechOff";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import TextToSpeech, { textToSpeechActions } from "../store/textToSpeech";
import { processTextToSpeech } from "../functions/processTextToSpeech";
import { genAudio, getVoices } from "../functions/elevenLabsTTS";
import { toggleAudio } from "../functions/PlayerActions";
import stream from "../store/stream";
const VoiceCommand = () => {
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(false);
  const textToSpeech = useSelector((state) => state.textToSpeech.text);
  const audioUrl = useSelector((state) => state.textToSpeech.audioUrl);
  const playerState = useSelector((state) => state.textToSpeech.playerState);
  const activeAI = useSelector((state) => state.ai.activeAI);
  const newAISelected = useSelector((state) => state.ai.newAISelected);
  const streamResponse = useSelector((state) => state.stream.streamResponse);

  const dispatch = useDispatch();
  const audioRef = useRef();

  //get active Voice
  const activeVoice = activeAI.voice;

  useEffect(() => {
    if (!isTextToSpeechEnabled) {
      return;
    }

    const getAudioSrc = async () => {
      let audioSrc = "";
      if (import.meta.env.VITE_ELEVENLABS !== "disabled") {
        // Eleven Labs Implementation :
        const listOfVoices = await getVoices();
        console.log(listOfVoices);

        console.log(activeAI.voice11labs);
        audioSrc = await genAudio({
          text: textToSpeech,
          voice: activeAI.voice11labs,
        });
        // AWS AMAZON POLLY
      } else {
        audioSrc = await processTextToSpeech(textToSpeech, activeVoice);
      }
      console.log(audioSrc);
      return audioSrc;
    };

    const audioSrc = getAudioSrc();
    audioSrc.then((src) => {
      dispatch(textToSpeechActions.updateAudioUrl(src));
    });
  }, [textToSpeech, isTextToSpeechEnabled]);

  useEffect(() => {
    if (streamResponse.length !== 10) return;

    const getAudioSrc = async () => {
      let audioSrc = "";

      audioSrc = await processTextToSpeech(streamResponse, activeVoice);

      console.log(audioSrc);
      return audioSrc;
    };

    const audioSrc = getAudioSrc();
    audioSrc.then((src) => {
      dispatch(textToSpeechActions.updateAudioUrl(src));
    });
  }, [streamResponse]);

  useEffect(() => {
    if (audioUrl) {
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

  const handleEnableTTS = () => {
    //clean up function
    if (isTextToSpeechEnabled) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsTextToSpeechEnabled((prevState) => !prevState);
  };

  // useEffect(() => {
  //   toggleAudio(playerState);

  // }, [playerState]);

  return (
    <div className="text-white">
      <audio
        controls
        src={audioUrl}
        ref={audioRef}
        style={{ display: "none" }}
      ></audio>

      <button onClick={handleEnableTTS}>
        {isTextToSpeechEnabled ? <TextToSpeechOn /> : <TextToSpeechOff />}
      </button>
    </div>
  );
};

export default VoiceCommand;
