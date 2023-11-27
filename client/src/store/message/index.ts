import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Message {
  message: string;
  type: string;
}

const initialState: Message = {
  message: "",
  type: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (
      state,
      action: PayloadAction<{ message: string; type: string }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const messageActions = messageSlice.actions;
export default messageSlice.reducer;
