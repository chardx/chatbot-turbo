import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
    playerState: "idle", //"playing" | "paused" | "idle",
    playerApiState: "idle", //"idle" | "loading" | "error";
    playerAudioQueue: [{
        blobURL: "",
        state: "",   //"text" | "loading" | "audio";
        text: ""
    }],
    playerIdx: 0,
}


// Create the slice
const audioStreamSlice = createSlice({
    name: 'audiostream',
    initialState,
    reducers: {
        updatePlayerAudioQueue(state, action) {
            state.playerAudioQueue = action.payload
        },
        updatePlayer(state, action) {
            state.playerState = action.payload
        }

    }
});

// Export the actions
export const audioStreamActions = audioStreamSlice.actions
export default audioStreamSlice.reducer