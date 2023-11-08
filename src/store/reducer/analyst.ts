import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalystProps } from "types/recipeAjax";

export interface AnalystsStateType {
  analysts: AnalystProps[];
}

const INIT_STATE: AnalystsStateType = {
  analysts: [],
};

const analystSlice = createSlice({
  name: "analyst",
  initialState: INIT_STATE,
  reducers: {
    addItemToAnalysts(
      state: AnalystsStateType,
      action: PayloadAction<AnalystProps>
    ) {
      const { analysts } = state;
      const newList = [...analysts, action.payload];

      return {
        analysts: newList,
      };
    },
  },
});

export const { addItemToAnalysts } = analystSlice.actions;

export default analystSlice.reducer;
