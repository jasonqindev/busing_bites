import DndContent from "components/dnd/dndContent";
import styles from "./nutritionAnalyst.module.scss";
import { useEffect, useState } from "react";
import DragOverComp from "components/dnd/dragOverComp";
import RecipeSearch from "./recipeSearch";
import DailyMeatAnalyst from "./dailyMeatArea";
import { RecipeCardProps } from "types/recipeAjax";
import RecipeItem from "./components/recipeItem";
import NutritionAnalyst from "./nutritionAnalyst";
import { useDispatch } from "react-redux";
import { updateMeatIds } from "store/reducer/analyst";
import DailyReport from "./dailyReport";

const RecipeAnalyst = () => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [activeItem, setActiveItem] = useState<RecipeCardProps | null>(null);
  const { id: activeId, title = "", image = "" } = activeItem || {};
  const [breakfastList, setBreakfastList] = useState<RecipeCardProps[]>([]);
  const [lunchList, setLunchList] = useState<RecipeCardProps[]>([]);
  const [dinnerList, setDinnerList] = useState<RecipeCardProps[]>([]);
  const [reportModalStatus, setReportModalStatus] = useState(false);

  useEffect(() => {
    if (reportModalStatus) {
      const ids = [...breakfastList, ...lunchList, ...dinnerList];

      dispatch(updateMeatIds(ids.map((c) => c.id)));
    }
  }, [reportModalStatus]); // eslint-disable-line

  const updateRecipes = (recipes: RecipeCardProps[]) => {
    setRecipes(recipes);
  };

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
    if (!recipe || !areaId) return;

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

  const deleteFromArea = (r_id: number, areaId: string) => {
    if (areaId === "breakfast") {
      setBreakfastList(breakfastList.filter((r) => r.id !== r_id));
    }
    if (areaId === "lunch") {
      setLunchList(lunchList.filter((r) => r.id !== r_id));
    }
    if (areaId === "dinner") {
      setDinnerList(dinnerList.filter((r) => r.id !== r_id));
    }
  };

  const changeReportModal = (status: boolean) => {
    setReportModalStatus(status);
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
              <DailyMeatAnalyst
                breakfastList={breakfastList}
                lunchList={lunchList}
                dinnerList={dinnerList}
                reportModalStatus={reportModalStatus}
                changeReportModal={changeReportModal}
                deleteFromArea={deleteFromArea}
              />
            </div>
            <div className={styles.medium}>
              <RecipeSearch recipes={recipes} setRecipes={updateRecipes} />
            </div>
            <div className={styles.right}>
              <NutritionAnalyst />
            </div>
          </div>
          <DailyReport
            status={reportModalStatus}
            onCloseModal={() => {
              changeReportModal(false);
            }}
          />
        </DndContent>
      </div>
    </div>
  );
};

export default RecipeAnalyst;
