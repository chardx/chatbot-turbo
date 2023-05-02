import { createSlice } from "@reduxjs/toolkit";


//Initial state
const initialMessagesState = {
    id: '',
    title: '',
    dateCreated: '',
    selectedAI: '',
    userID: '',
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
        startNewConversation(state, action) {
            state.title = action.payload.title
            state.id = action.payload.id
            state.dateCreated = action.payload.dateCreated
            state.selectedAI = action.payload.selectedAI
            state.userID = action.payload.userID
            state.messages = [...action.payload.messages]
        },
        updateMessage(state, action) {

            state.messages = [...action.payload]
        },
        updateTitle(state, action) {

            state.title = action.payload
        },

    }
});

// Export the actions
export const messagesActions = messagesSlice.actions
export default messagesSlice.reducer