
// Import the necessary packages and components
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    activeAI: "r1"
}

const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
        update(state, action) {
            state.activeAI = action.payload
        }
    }
});

// Create store using the configureStore() function
const store = configureStore({
    reducer: aiSlice.reducer

})

export const aiActions = aiSlice.actions
export default store;