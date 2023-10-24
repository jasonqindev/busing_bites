import { useLoadRecipeData } from "hooks/useLoadRecipe";
import { ScrollArea } from "@mantine/core";
import RecipeCard from "./components/recipeCard";
import Pagination from "./components/pagination";
import styles from "./recipeList.module.scss";

const RecipeList = () => {
  const { results: recipeList, totalResults } = useLoadRecipeData();

  return (
    <main className={styles.recipeListContainer}>
      <aside className={styles.nav}></aside>
      <ScrollArea h={window.innerHeight - 63} className={styles.recipeYield}>
        <div className={styles.recipeGroup}>
          {recipeList &&
            recipeList.length &&
            recipeList.map((recipe) => {
              return <RecipeCard key={recipe.id} {...recipe} />;
            })}
        </div>
        <Pagination totalResults={totalResults} />
      </ScrollArea>
    </main>
  );
};

export default RecipeList;
