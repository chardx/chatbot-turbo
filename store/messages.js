import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// const initialMessage = useSelector((state) => state.ai.initialMessage);

//Initial state
const initialMessagesState = {
    messages: [{
        message: "",
        sentTime: "just now",
        sender: "ChatGPT",
    }]
}

// Create the slice
const messagesSlice = createSlice({
    name: 'messages',
    initialState: initialMessagesState,
    reducers: {
        updateMessage(state, action) {
            state.messages = [...action.payload]
        },

    }
});

// Export the actions
export const messagesActions = messagesSlice.actions
export default messagesSlice.reducer