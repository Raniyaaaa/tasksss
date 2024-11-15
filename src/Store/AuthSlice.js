import { configureStore, createSlice } from '@reduxjs/toolkit';

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
        },
        logout(state) {
            state.token = null;
            state.userId = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        },
    },
});

export const authActions = authSlice.actions;

const store = configureStore({
    reducer: { auth: authSlice.reducer },
});

export default store;
