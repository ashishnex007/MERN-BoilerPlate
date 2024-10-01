import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
};

const initialState: AuthState = {
    token: localStorage.getItem('token'), // Initialize the state with the token from localStorage
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload); // Save token to localStorage
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('token'); // Remove token from localStorage
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
});
  
export const { setToken, clearToken, logout } = authSlice.actions;

export default authSlice.reducer;