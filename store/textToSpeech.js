import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
    text: '',
    audioUrl: '',
}


// Create the slice
const textToSpeechSlice = createSlice({
    name: 'textToSpeech',
    initialState,
    reducers: {
        updateText(state, action) {
            state.text = action.payload
        },
        updateAudioUrl(state, action) {
            state.audioUrl = action.payload
        }
    }
});

// Export the actions
export const textToSpeechActions = textToSpeechSlice.actions
export default textToSpeechSlice.reducer