import { useLoadRecipeData } from "hooks/useLoadRecipe";
import { Box, ScrollArea, LoadingOverlay } from "@mantine/core";
import RecipeCard from "./components/recipeCard";
import Pagination from "./components/pagination";
import styles from "./recipeList.module.scss";
import { getFormComponents } from "components/formComponents";
import { useEffect, useRef, useState } from "react";
import { recipes_pageSize } from "const";
import PlaceholderComp from "components/placeholderComp";

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
  const pageSize = 30 || recipes_pageSize;
  const [page, setPage] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const {
    results: recipeList = [],
    totalResults,
    loading,
  } = useLoadRecipeData({ page, addRecipeInformation: true, pageSize });

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
        style={{ position: "relative" }}
      >
        {loading && <LoadingOverlay visible={loading} zIndex={1000} />}
        {!recipeList.length && !loading && (
          <PlaceholderComp img="/images/no_data.jpg" title="Result not found" />
        )}
        <div className={styles.recipeGroup}>
          {!!recipeList.length &&
            recipeList.map((recipe) => {
              return <RecipeCard key={recipe.id} {...recipe} />;
            })}
        </div>
        {totalResults > 20 && (
          <Pagination
            pageSize={pageSize}
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
