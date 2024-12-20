import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    isLoggedIn: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.isLoggedIn = true;
            localStorage.setItem('token', state.token);
            localStorage.setItem('userId', state.userId);
            localStorage.setItem('theme', 'light');
        },
        logout(state) {
            state.token = null;
            state.userId = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('theme')
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
