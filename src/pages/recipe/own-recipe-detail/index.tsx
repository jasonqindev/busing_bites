import { useParams } from "react-router-dom";
import styles from "./recipeDetail.module.scss";
import { useLoadRecipeDetailByRecipeId } from "hooks/useLoadRecipe";
import { LoadingOverlay, Text, Title } from "@mantine/core";

import RecipeBrief from "./components/recipeBrief";
import Ingredients from "./components/ingredients";
import Procedure from "./components/procedure";

const MyRecipeDetail = () => {
  const { id = "" } = useParams();
  const { recipeData, loading } = useLoadRecipeDetailByRecipeId(id);

  return (
    <div className={styles.page}>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {!loading && (
        <div className={styles.recipeContainer}>
          <main className={styles.recipeYield}>
            <RecipeBrief {...recipeData} />
            <div className={styles.step}>
              <Procedure {...recipeData} />
              <Ingredients {...recipeData} />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default MyRecipeDetail;
