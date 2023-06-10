import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
    activeChatID: '',
    history: [{
        dateCreated: '',
        dateLastUpdated: '',
        id: '',
        selectedAI: '',
        title: '',
        userID: '',
        messages: [{
            message: "",
            sentTime: "just now",
            sender: "ChatGPT",
        }]
    }],
}


// Create the slice
const chatHistoryslice = createSlice({
    name: 'chatHistory',
    initialState,
    reducers: {
        refreshHistory(state, action) {
            state.history = action.payload
        },
        addNewConversation(state, action) {
            //Add the new conversation to the top of the history
            state.history.unshift(action.payload)
        },
        sortChatHistory(state, action) {

            const filteredMessages = action.payload.messages.slice(-2);
            state.history.find(history => history.id === action.payload.id).messages.push(...filteredMessages)
            //Sort the history by dateLastUpdated
            state.history.find(history => history.id === action.payload.id).dateLastUpdated = new Date().toLocaleString();
            state.history.sort((a, b) => new Date(b.dateLastUpdated) - new Date(a.dateLastUpdated))
        },
        setActiveChatID(state, action) {
            state.activeChatID = action.payload
        }
    }
});

// Export the actions
export const chatHistoryActions = chatHistoryslice.actions
export default chatHistoryslice.reducer