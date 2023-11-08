import { useParams } from "react-router-dom";
import styles from "./recipeDetail.module.scss";
import { useLoadRecipeInfo } from "hooks/useLoadRecipe";
import { LoadingOverlay, Text, Title } from "@mantine/core";

import RecipeBrief from "./components/recipeBrief";
import Ingredients from "./components/ingredients";
import Procedure from "./components/procedure";

const RecipeDetail = () => {
  const { id = "" } = useParams();
  const { recipeData, loading } = useLoadRecipeInfo(id);

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
            <div className={styles.summaryBox}>
              <Title order={2} mb={10}>
                Summary
              </Title>
              <Text
                style={{ textIndent: "2em" }}
                dangerouslySetInnerHTML={{ __html: recipeData.summary || "" }}
              />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
