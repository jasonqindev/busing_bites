import styles from "./components.module.scss";
import DragBox from "components/dragBox";
import RecipeInput from "components/formComponents/recipeInput";
import { FC } from "react";
import { RecipeCardProps } from "types/recipeAjax";
import RecipeItem from "./recipeItem";
import { LoadingOverlay } from "@mantine/core";

interface PropsType {
  loading: boolean;
  recipes: RecipeCardProps[];
}

const RecipeSearch: FC<PropsType> = ({ recipes, loading }) => {
  return (
    <div className={styles.searchField}>
      <RecipeInput label={"recipe"} />
      <div className={styles.recipeList}>
        <LoadingOverlay visible={loading} zIndex={1000} />
        {recipes.map((c) => (
          <DragBox key={c.id} id={String(c.id)}>
            <RecipeItem {...c} />
          </DragBox>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
