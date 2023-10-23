import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import { useLoadRecipeData } from "hooks/useLoadRecipe";
import RecipeCard from "./components/recipeCard";
import Pagination from "./components/pagination";
import styles from "./recipeList.module.scss";

const RecipeList = () => {
  const [opened, { toggle }] = useDisclosure();
  const { results: recipeList, totalResults } = useLoadRecipeData();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md"></AppShell.Navbar>
      <AppShell.Main>
        <div className={styles.recipeYield}>
          {recipeList &&
            recipeList.length &&
            recipeList.map((recipe) => {
              return <RecipeCard key={recipe.id} {...recipe} />;
            })}
        </div>
        <Pagination totalResults={totalResults} />
      </AppShell.Main>
    </AppShell>
  );
};

export default RecipeList;
