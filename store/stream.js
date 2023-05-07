import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
    streamResponse: '',
    status: 'idle',
}


// Create the slice
const streamResponseSlice = createSlice({
    name: 'stream',
    initialState,
    reducers: {
        updateStreamResponse(state, action) {
            state.streamResponse = action.payload
        },
        updateStreamStatus(state, action) {
            state.status = action.payload
        },
    }
});

// Export the actions
export const streamResponseActions = streamResponseSlice.actions
export default streamResponseSlice.reducer