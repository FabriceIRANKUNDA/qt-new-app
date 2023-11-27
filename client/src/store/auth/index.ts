import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import store from "store";

interface User {
  displayName: string;
  id: string;
  emails: Object[];
  photos: Object[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  reset: boolean;
  otpVerified: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  reset: false,
  otpVerified: false,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      store.set("x-auth-token", action.payload.token);
      store.set("user", action.payload.user);
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload.error;
    },
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    logoutFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload.error;
    },
    signup: (state, action: PayloadAction<{ token: string; user: User }>) => {
      store.set("x-auth-token", action.payload.token);
      store.set("user", action.payload.user);
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    resetPassword: (
      state,
      action: PayloadAction<{ reset: boolean; otpVerified: boolean }>
    ) => {
      state.reset = action.payload.reset;
      state.otpVerified = action.payload.otpVerified;
    },
    signupFailed: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const authActions = authslice.actions;
export default authslice.reducer;
