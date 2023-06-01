// import { genAudio as genAudioAzure } from "@/stores/AzureSDK";
// import { genAudio as genAudio11Labs } from "@/stores/ElevenLabs";

// import { useChatStore } from "./ChatStore";
// import { notifications } from "@mantine/notifications";

// const DEFAULT_AZURE_VOICE = "en-US-JaneNeural";
// const DEFAULT_11LABS_VOICE = "21m00Tcm4TlvDq8ikWAM";

// const get = useChatStore.getState;
// const set = useChatStore.setState;


const getVars = () => {
};

function splitSentences(text) {
    if (!text) return [];
    const sentences = text.match(/[^.!?]+[.!?]/g) || [text];
    const chunks = [];

    const chunksSizes = [25, 100, 200, 500, 1000];

    let chunk = "";
    for (const sentence of sentences) {
        chunk += sentence;
        const thisChunkSize =
            chunksSizes[Math.min(chunks.length, chunksSizes.length - 1)];
        if (chunk.length >= thisChunkSize) {
            chunks.push(chunk);
            chunk = "";
        }
    }

    if (chunk.length > 0) {
        chunks.push(chunk);
    }

    return chunks;
}

const chunkify = (text) => {
    const sentences = splitSentences(text);
    console.log("sentences")
    console.log(sentences)
    return sentences.map((sentence) => ({
        text: sentence,
        state: "text",
        blobURL: "",
    }));
};

export const initPlayback = (streamStatus, audioStream, audioStreamActions, dispatch, updateStreamResponse) => {

    const playerAudioQueue = audioStream.playerAudioQueue;
    const playerApiState = audioStream.playerApiState;

    const checker = async () => {
        const updatedStreamResponse = await updateStreamResponse();
        console.log("streamResponse")
        console.log(updatedStreamResponse)


        const chunks = chunkify(updatedStreamResponse);

        console.log("chunks")
        console.log(chunks)
        if (streamStatus === "streaming") {
            chunks.pop();
        }

        if (chunks.length > playerAudioQueue.length) {
            const newElems = chunks.splice(playerAudioQueue.length);
            // set({ playerAudioQueue: [...(playerAudioQueue || []), ...newElems] });
            dispatch(audioStreamActions.updatePlayerAudioQueue([...(playerAudioQueue || []), ...newElems]));
        }

        const firstIdleChunk = playerAudioQueue.findIndex(
            (chunk) => chunk.state === "text"
        );

        if (firstIdleChunk !== -1 && playerApiState === "idle") {
            await fetchAudio(firstIdleChunk);
        }
    };
    const interval = setInterval(checker, 1000);
    checker();

    const ref = new Audio();

    dispatch(audioStreamActions.updatePlayer({
        playerIdx: -1,
        playerState: "idle",
        playerApiState: "idle",
        playerAudioQueue: [],
    }));

    return () => {
        clearInterval(interval);
    };
};

export const playAudio = (idx) => {
    if (playerState === 'playing') {
        console.log('player is still playing, skipping playing');
        return;
    }
    if (playerIdx + 1 >= playerAudioQueue.length) {
        console.log('next chunk is not queued, skipping playing');
        return;
    }
    if (playerAudioQueue[playerIdx + 1].state !== 'audio') {
        console.log('next chunk does not have audio, skipping playing');
        return;
    }
    set({
        playerIdx: playerIdx + 1,
        playerState: "playing",
    });
    if (playerRef.current) {
        playerRef.current.src = playerAudioQueue[playerIdx + 1].blobURL;
        ensureListeners(playerRef.current);

        playerRef.current.play();
    }
};

const fetchAudio = async (idx) => {
    const { apiKey, apiKeyRegion, voiceId, voiceStyle, genAudio } = getVars();
    const { playerAudioQueue } = get();

    const chunk = playerAudioQueue[idx];
    if (!chunk) {
        return;
    }

    if (!apiKey) {
        return;
    }

    set({ playerApiState: "loading" });

    try {
        const audioURL = await genAudio({
            text: chunk.text,
            key: apiKey,
            region: apiKeyRegion,
            voice: voiceId,
            style: voiceStyle,
        });
        if (audioURL) {
            set({
                playerAudioQueue: playerAudioQueue.map((chunk, i) =>
                    i === idx ? { ...chunk, blobURL: audioURL, state: "audio" } : chunk
                ),
            });
            if (get().playerState === "idle") {
                playAudio(idx);
            }
        }
    } catch (error) {
        console.error(error);
    }

    set({ playerApiState: "idle" });
};

const ensureListeners = (audio) => {
    if (get().playerRefInit) return;
    set({ playerRefInit: true });

    audio.addEventListener("ended", () => {
        const { playerIdx, playerAudioQueue } = get();
        set({ playerState: "idle" });
        if (playerIdx + 1 < playerAudioQueue.length) {
            playAudio(playerIdx + 1);
        }
    });
};

export const toggleAudio = (playerState) => {

    if (playerState === "playing") {
        if (playerRef.current) {
            playerRef.current.pause();
        }
        set({ playerState: "paused" });
    } else if (playerState === "paused") {
        if (playerRef.current) {
            playerRef.current.play();
        }
        set({ playerState: "playing" });
    } else if (playerState === "idle") {
        playAudio(0);
    }
};
