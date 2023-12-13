import { Flex, Title } from "@mantine/core";
import RecipeCard from "pages/recipe/recipe-list/components/recipeCard";
import { FC, useEffect } from "react";
import { RecipeCardProps } from "types/recipeAjax";
import styles from "../profile.module.scss";

interface PropsType {
  recipes: RecipeCardProps[];
  setParams: (data: any) => void;
}

const MyRecipes: FC<PropsType> = ({ recipes = [], setParams }) => {
  useEffect(() => {
    return () =>
      setParams({
        link: "",
      });
  }, []); // eslint-disable-line

  return (
    <div className={styles.mainPage}>
      <Title className={styles.title}>My Recipes</Title>
      <Flex direction={"row"} wrap={"wrap"} className={styles.recipes}>
        {recipes?.map((recipe) => {
          return <RecipeCard key={recipe.id} {...recipe} isOwn={true} />;
        })}
      </Flex>
    </div>
  );
};

export default MyRecipes;
