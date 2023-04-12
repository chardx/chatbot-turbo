
// Import the necessary packages and components
import { configureStore } from '@reduxjs/toolkit';
import aiReducer from './ai';
import textToSpeechReducer from './textToSpeech';
import messagesReducer from './messages'

// Create store using the configureStore() function
const store = configureStore({
    reducer: {
        messages: messagesReducer,
        ai: aiReducer,
        textToSpeech: textToSpeechReducer,
    }

})


export default store;