import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import message from "./message";
import taskReducer from "./task";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: message,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
