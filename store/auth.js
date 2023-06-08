import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
    isLoggedIn: false,
    userDisplayName: '',
    userPhotoUrl: '',

}


// Create the slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateLoginStatus(state, action) {
            state.isLoggedIn = action.payload.loginStatus
            state.userDisplayName = action.payload.userDisplayName
            state.userPhotoUrl = action.payload.userPhotoUrl
        },
    }
});

// Export the actions
export const authActions = authSlice.actions
export default authSlice.reducer