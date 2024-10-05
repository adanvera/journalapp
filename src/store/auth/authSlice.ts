import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth ',
    initialState: {
        status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    login,
    logout,
    checkingCredentials
} = authSlice.actions;