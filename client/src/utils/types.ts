// types.ts
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store"; // Adjust this import based on your project structure

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
