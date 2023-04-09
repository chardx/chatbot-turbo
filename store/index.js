
// Import the necessary packages and components
import { configureStore } from '@reduxjs/toolkit';
import aiReducer from './ai';
import textToSpeechReducer from './textToSpeech';

// Create store using the configureStore() function
const store = configureStore({
    reducer: {
        ai: aiReducer,
        textToSpeech: textToSpeechReducer,
    }

})


export default store;