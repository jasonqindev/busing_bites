import { useSelector } from "react-redux";
import { ReducerState } from "store";
import { AnalystsStateType } from "store/reducer/analyst";

export const useGetRecipeAnalyst = () => {
  const { dailyMeatIds, selectedId } = useSelector<ReducerState>(
    (state) => state.analysts
  ) as AnalystsStateType;

  return { dailyMeatIds, selectedId };
};
