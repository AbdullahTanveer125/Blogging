import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("In Slice= ", action.payload)
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            // console.log("========After Add In Slice====== ", state.user)
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            state.isAuthenticated = false;
        },
        loadFromStorage: (state) => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                const user = localStorage.getItem('user');
                if (token && user) {
                    state.token = token;
                    state.user = JSON.parse(user);
                    state.isAuthenticated = true;
                }
            }
        },
    },
});

export const { setUser, clearUser, loadFromStorage } = userSlice.actions;
export default userSlice.reducer;
