import { configureStore } from "@reduxjs/toolkit";
import AnalystsReducer, { AnalystsStateType } from "./reducer/analyst";

export interface ReducerState {
  analysts: AnalystsStateType;
}

export default configureStore({
  reducer: {
    analysts: AnalystsReducer,
  },
});
