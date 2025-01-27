import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TUser = {
    userId: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
};

type TAuthState = {
    user: null | TUser;
    token: null | string;
    refreshToken: null | string;
};

const initialState: TAuthState = {
    user: null,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: TUser; token: string; refreshToken: string }>) => {
            const { user, token, refreshToken } = action.payload;
            state.user = user;
            state.token = token;
            state.refreshToken = refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken; 
