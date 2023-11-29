import { Flex, Title } from "@mantine/core";
import RecipeCard from "pages/recipe/recipe-list/components/recipeCard";
import { FC } from "react";
import { RecipeCardProps } from "types/recipeAjax";
import styles from "../profile.module.scss";

interface PropsType {
  recipes: RecipeCardProps[];
}

const MyRecipes: FC<PropsType> = ({ recipes }) => {
  return (
    <div className={styles.mainPage}>
      <Title className={styles.title}>My Recipes</Title>
      <Flex direction={"row"} wrap={"wrap"} className={styles.recipes}>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} {...recipe} />;
        })}
      </Flex>
    </div>
  );
};

export default MyRecipes;
