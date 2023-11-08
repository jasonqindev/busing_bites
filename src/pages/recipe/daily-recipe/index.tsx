import DndContent from "components/dnd/dndContent";
import styles from "./dailyRecipe.module.scss";
import { useEffect, useState } from "react";
import DragOverComp from "components/dnd/dragOverComp";
import { useLoadRecipeData } from "hooks/useLoadRecipe";
import RecipeSearch from "./components/recipeSearch";
import DailyMeatAnalyst from "./components/dailyMeatArea";
import { RecipeCardProps } from "types/recipeAjax";
import RecipeItem from "./components/recipeItem";
import NutritionCalculator from "./components/nutritionAnalyst";

const DailyRecipe = () => {
  const [page, setPage] = useState(1);
  const { results, totalResults, loading } = useLoadRecipeData({
    page,
    pageSize: 50,
  });
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [activeItem, setActiveItem] = useState<RecipeCardProps | null>(null);
  const { id: activeId, title = "", image = "" } = activeItem || {};
  const [breakfastList, setBreakfastList] = useState<RecipeCardProps[]>([]);
  const [lunchList, setLunchList] = useState<RecipeCardProps[]>([]);
  const [dinnerList, setDinnerList] = useState<RecipeCardProps[]>([]);

  useEffect(() => {
    setRecipes(results || []);
  }, [results]);

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
            <RecipeItem title={title} image={image} lineClamp={1} />
          </DragOverComp>
          <div className={styles.recipeSearchField}>
            <div className={styles.left}>
              <RecipeSearch recipes={recipes} loading={loading} />
            </div>
            <div className={styles.medium}>
              <DailyMeatAnalyst
                breakfastList={breakfastList}
                lunchList={lunchList}
                dinnerList={dinnerList}
              />
            </div>
            <div className={styles.right}>
              <NutritionCalculator />
            </div>
          </div>
        </DndContent>
      </div>
    </div>
  );
};

export default DailyRecipe;
