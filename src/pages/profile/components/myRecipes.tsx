import { Flex, Title } from "@mantine/core";
import RecipeCard from "pages/recipe/recipe-list/components/recipeCard";
import { FC } from "react";
import { RecipeCardProps } from "types/recipeAjax";

interface PropsType {
  recipes: RecipeCardProps[];
}

const MyRecipes: FC<PropsType> = ({ recipes }) => {
  return (
    <>
      <Title mb={30}>My Recipes</Title>
      <Flex direction={"row"} wrap={"wrap"}>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} {...recipe} />;
        })}
      </Flex>
    </>
  );
};

export default MyRecipes;
