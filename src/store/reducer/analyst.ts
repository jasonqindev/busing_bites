import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AnalystsStateType {
  selectedId: string;
  dailyMeatIds: number[];
}

const INIT_STATE: AnalystsStateType = {
  dailyMeatIds: [],
  selectedId: "",
};

const analystSlice = createSlice({
  name: "analyst",
  initialState: INIT_STATE,
  reducers: {
    changeSelectedId(state: AnalystsStateType, action: PayloadAction<string>) {
      return {
        ...state,
        selectedId: action.payload,
      };
    },
    updateMeatIds(state: AnalystsStateType, action: PayloadAction<number[]>) {
      const newList = action.payload;

      return {
        ...state,
        dailyMeatIds: newList,
      };
    },
  },
});

export const { updateMeatIds, changeSelectedId } = analystSlice.actions;

export default analystSlice.reducer;
