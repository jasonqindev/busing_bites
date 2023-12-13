import { useLoadRecipeData, useLoadRecipes } from "hooks/useLoadRecipe";
import { Box, ScrollArea, LoadingOverlay, Checkbox } from "@mantine/core";
import RecipeCard from "./components/recipeCard";
import Pagination from "./components/pagination";
import styles from "./recipeList.module.scss";
import { getFormComponents } from "components/formComponents";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const [useOwnDataStatus, setUseOwnDataStatus] = useState(false);
  const {
    results: recipeList = [],
    totalResults,
    loading,
  } = useLoadRecipeData({ page, addRecipeInformation: true, pageSize });
  const { ownRecipes, run: getOwnData, loading: ownLoading } = useLoadRecipes();

  const pageChange = (page: number) => {
    setPage(page);
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked;
    setUseOwnDataStatus(status);
    if (status) {
      getOwnData();
    }
  };

  useEffect(() => {
    viewport.current!.scrollTo({ top: 0, behavior: "smooth" });
  }, [recipeList]);

  return (
    <main className={styles.recipeListContainer}>
      <aside className={styles.nav}>
        <Checkbox
          checked={useOwnDataStatus}
          label="Recipes from own database"
          onChange={handleCheckbox}
          mb={30}
        />
        {formCompLayout.map((c, index) => (
          <Box key={index} className={styles.formControl}>
            {getFormComponents(c, useOwnDataStatus)}
          </Box>
        ))}
      </aside>
      <ScrollArea
        h={window.innerHeight - 63}
        className={styles.recipeYield}
        viewportRef={viewport}
        style={{ position: "relative" }}
      >
        {useOwnDataStatus ? (
          <>
            {ownLoading && (
              <LoadingOverlay visible={ownLoading} zIndex={1000} />
            )}
            <div className={styles.recipeGroup}>
              {!!ownRecipes?.length &&
                ownRecipes.map((recipe) => {
                  return (
                    <RecipeCard key={recipe.id} {...recipe} isOwn={true} />
                  );
                })}
            </div>
          </>
        ) : (
          <>
            {loading && <LoadingOverlay visible={loading} zIndex={1000} />}
            {!recipeList.length && !loading && (
              <PlaceholderComp
                img="/images/no_data.jpg"
                title="Result not found"
              />
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
          </>
        )}
      </ScrollArea>
    </main>
  );
};

export default RecipeList;
