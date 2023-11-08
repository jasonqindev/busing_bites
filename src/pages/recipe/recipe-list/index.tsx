import { useLoadRecipeData } from "hooks/useLoadRecipe";
import { Box, ScrollArea, LoadingOverlay } from "@mantine/core";
import RecipeCard from "./components/recipeCard";
import Pagination from "./components/pagination";
import styles from "./recipeList.module.scss";
import { getFormComponents } from "components/formComponents";
import { useEffect, useRef, useState } from "react";

const formCompLayout = [
  "recipe",
  "cuisines",
  "diet",
  "intolerances",
  "type",
  "equipment",
  "includeIngreds",
  "excludeIngreds",
];

const RecipeList = () => {
  const [page, setPage] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const {
    results: recipeList,
    totalResults,
    loading,
  } = useLoadRecipeData({ page, addRecipeInformation: true });

  const pageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    viewport.current!.scrollTo({ top: 0, behavior: "smooth" });
  }, [recipeList]);

  return (
    <main className={styles.recipeListContainer}>
      <aside className={styles.nav}>
        {formCompLayout.map((c, index) => (
          <Box key={index} className={styles.formControl}>
            {getFormComponents(c)}
          </Box>
        ))}
      </aside>
      <ScrollArea
        h={window.innerHeight - 63}
        className={styles.recipeYield}
        viewportRef={viewport}
      >
        <LoadingOverlay visible={loading} zIndex={1000} />
        <div className={styles.recipeGroup}>
          {recipeList &&
            !!recipeList.length &&
            recipeList.map((recipe) => {
              return <RecipeCard key={recipe.id} {...recipe} />;
            })}
        </div>
        {totalResults > 20 && (
          <Pagination
            totalResults={totalResults}
            page={page}
            pageChange={pageChange}
          />
        )}
      </ScrollArea>
    </main>
  );
};

export default RecipeList;
