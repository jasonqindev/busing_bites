import DndContent from "components/dndContent";
import styles from "./dailyRecipe.module.scss";
import { useEffect, useState } from "react";
import DragOverComp from "components/dragOverComp";
import { useLoadRecipeData } from "hooks/useLoadRecipe";
import RecipeSearch from "./components/recipeSearch";
import DailyMeatAnalyst from "./components/dailyMeatAnalyst";
import { RecipeCardProps } from "types/recipeAjax";
import RecipeItem from "./components/recipeItem";

const DailyRecipe = () => {
  const [page, setPage] = useState(1);
  const {
    results: list,
    totalResults,
    loading,
  } = useLoadRecipeData({ page, addRecipeInformation: true, number: 50 });
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [activeItem, setActiveItem] = useState<RecipeCardProps | null>(null);
  const { id: activeId, title = "", image = "" } = activeItem || {};
  const [breakfastList, setBreakfastList] = useState<RecipeCardProps[]>([]);
  const [lunchList, setLunchList] = useState<RecipeCardProps[]>([]);
  const [dinnerList, setDinnerList] = useState<RecipeCardProps[]>([]);

  useEffect(() => {
    setRecipes(list || []);
  }, [list]);

  const getActiveRecipeByData = (id: string) => {
    return recipes.find((d) => d.id === Number(id)) || null;
  };

  const checkIsRepeat = (data: RecipeCardProps[], id: string) => {
    return !!data.find((d) => d.id === Number(id));
  };

  function handleDragStart(id: string) {
    setActiveItem(getActiveRecipeByData(id));
  }

  const handleDragEnd = (sourceId: string, areaId: string) => {
    const recipe = getActiveRecipeByData(sourceId);
    if (!recipe) return;

    if (areaId === "breakfast") {
      if (checkIsRepeat(breakfastList, sourceId)) return;
      setBreakfastList([...breakfastList, recipe]);
    }
    if (areaId === "lunch") {
      if (checkIsRepeat(lunchList, sourceId)) return;
      setLunchList([...lunchList, recipe]);
    }
    if (areaId === "dinner") {
      if (checkIsRepeat(dinnerList, sourceId)) return;
      setDinnerList([...dinnerList, recipe]);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <DndContent onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <DragOverComp activeId={activeId ? Number(activeId) : null}>
            <RecipeItem title={title} image={image} />
          </DragOverComp>
          <div className={styles.recipeSearchField}>
            <div className={styles.left}>
              <RecipeSearch recipes={recipes} loading={loading} />
            </div>
            <div className={styles.right}>
              <DailyMeatAnalyst
                breakfastList={breakfastList}
                lunchList={lunchList}
                dinnerList={dinnerList}
              />
            </div>
          </div>
        </DndContent>
      </div>
    </div>
  );
};

export default DailyRecipe;
