import styles from "./components.module.scss";
import DropBox from "components/dnd/dropBox";
import { Title } from "@mantine/core";
import { FC } from "react";
import { RecipeCardProps } from "types/recipeAjax";
import RecipeItem from "./recipeItem";

const planArea = ["breakfast", "lunch", "dinner"];

interface PropsType {
  breakfastList: RecipeCardProps[];
  lunchList: RecipeCardProps[];
  dinnerList: RecipeCardProps[];
}

const DailyMeatAnalyst: FC<PropsType> = ({
  breakfastList,
  lunchList,
  dinnerList,
}) => {
  return (
    <div className={styles.dailyMeatBox}>
      {planArea.map((area) => {
        const list =
          area === "breakfast"
            ? breakfastList
            : area === "lunch"
            ? lunchList
            : dinnerList;
        return (
          <div key={area} className={styles.recipePlan}>
            <Title order={5}>{area}</Title>
            <DropBox id={area}>
              <div className={styles.dropArea}>
                {list.map((c) => (
                  <RecipeItem
                    lineClamp={2}
                    key={area + c.id}
                    title={c.title}
                    image={c.image}
                  />
                ))}
              </div>
            </DropBox>
          </div>
        );
      })}
    </div>
  );
};

export default DailyMeatAnalyst;
