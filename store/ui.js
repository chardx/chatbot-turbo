import { isMobile } from "react-device-detect";
import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
    isMobile: isMobile,
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
            state.isMobile && (state.leftDrawerOpen = false)


        },
        updateLeftDrawerOpen(state, action) {
            state.leftDrawerOpen = action.payload
            state.isMobile && (state.rightDrawerOpen = false)
        },
        closeAllDrawers(state) {
            state.isMobile && (state.rightDrawerOpen = false)
            state.isMobile && (state.leftDrawerOpen = false)
        },
        updateMobileState(state, action) {
            state.isMobile = action.payload
        }
    }
});

// Export the actions
export const uiActions = uiSlice.actions
export default uiSlice.reducer