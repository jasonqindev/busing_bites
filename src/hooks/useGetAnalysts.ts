import { useSelector } from "react-redux";
import { ReducerState } from "store";
import { AnalystProps } from "types/recipeAjax";

export const useGetAnalysts = () => {
  const { analysts } = useSelector<ReducerState>(
    (state) => state.analysts
  ) as AnalystProps;

  return { analysts };
};
