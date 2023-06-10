
// Import the necessary packages and components
import { configureStore } from '@reduxjs/toolkit';
import aiReducer from './ai';
import textToSpeechReducer from './textToSpeech';
import messagesReducer from './messages'
import streamReducer from './stream'
import audioStreamReducer from './audioStream'
import authReducer from './auth'
import chatHistoryReducer from './chatHistory'

// Create store using the configureStore() function
const store = configureStore({
    reducer: {
        auth: authReducer,
        messages: messagesReducer,
        chatHistory: chatHistoryReducer,
        ai: aiReducer,
        textToSpeech: textToSpeechReducer,
        stream: streamReducer,
        audiostream: audioStreamReducer,
    }

})


export default store;