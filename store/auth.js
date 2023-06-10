import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
    isLoggedIn: false,
    userInfo: {
        userID: '',
        displayName: '',
        photoUrl: ''

    },

}


// Create the slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateLoginStatus(state, action) {
            state.isLoggedIn = action.payload.loginStatus
            state.userInfo = action.payload.userInfo

        },
    }
});

// Export the actions
export const authActions = authSlice.actions
export default authSlice.reducer