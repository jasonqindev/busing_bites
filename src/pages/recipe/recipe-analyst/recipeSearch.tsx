import styles from "./nutritionAnalyst.module.scss";
import DragBox from "components/dnd/dragBox";
import RecipeInput from "components/formComponents/recipeInput";
import { FC, useEffect, useRef, useState } from "react";
import { RecipeCardProps } from "types/recipeAjax";
import RecipeItem from "./components/recipeItem";
import { Box, LoadingOverlay, ScrollArea } from "@mantine/core";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "store/reducer/analyst";
import { useLoadRecipeData } from "hooks/useLoadRecipe";

interface PropsType {
  recipes: RecipeCardProps[];
  setRecipes: (recipes: RecipeCardProps[]) => void;
}

const RecipeSearch: FC<PropsType> = ({ recipes, setRecipes }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const scrollDom = useRef<HTMLDivElement>(null);
  const {
    results = [],
    totalResults,
    loading,
  } = useLoadRecipeData({
    page,
    pageSize: 50,
  });

  useEffect(() => {
    setRecipes([...recipes, ...results]);
  }, [results]); // eslint-disable-line

  const handleClick = (id: number) => {
    dispatch(changeSelectedId(String(id)));
  };

  const onScrollPositionChange = ({ y }: { y: number }) => {
    if (totalResults === recipes.length) return;
    if (scrollDom.current && scrollDom.current.children[0]) {
      if (
        y + scrollDom.current.clientHeight >=
        scrollDom.current.scrollHeight - 100
      ) {
        if (Math.ceil(totalResults / 50) > page) {
          setPage(page + 1);
        }
      }
    }
  };

  return (
    <div className={styles.searchField}>
      <div className={styles.searchInput}>
        <RecipeInput label={"recipe search"} />
      </div>
      <ScrollArea
        viewportRef={scrollDom}
        h={window.innerHeight - 163 - 109}
        className={styles.recipeList}
        onScrollPositionChange={onScrollPositionChange}
      >
        <LoadingOverlay visible={loading} zIndex={1000} />
        {recipes.map((c) => (
          <DragBox key={c.id} id={String(c.id)}>
            <Box
              className={styles.recipeItem}
              onClick={() => {
                handleClick(c.id);
              }}
            >
              <RecipeItem {...c} />
            </Box>
          </DragBox>
        ))}
      </ScrollArea>
    </div>
  );
};

export default RecipeSearch;
