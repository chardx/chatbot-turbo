import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
    isMobile: false,
    rightDrawerOpen: false,
    leftDrawerOpen: false,
}


// Create the slice
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        updateRightDrawerOpen(state, action) {
            state.rightDrawerOpen = action.payload
            state.leftDrawerOpen = false


        },
        updateLeftDrawerOpen(state, action) {
            state.leftDrawerOpen = action.payload
            state.rightDrawerOpen && (state.rightDrawerOpen = false)
        },
        closeAllDrawers(state) {
            state.rightDrawerOpen && (state.rightDrawerOpen = false)
            state.leftDrawerOpen && (state.leftDrawerOpen = false)
        }
    }
});

// Export the actions
export const uiActions = uiSlice.actions
export default uiSlice.reducer