import styles from "./components.module.scss";

import { Badge, Image } from "@mantine/core";
import { badgeColors } from "utils";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BsFillPeopleFill } from "react-icons/bs";

import { RecipeProps } from "types/recipe";
import { judgeItem } from "const";

type DietOption =
  | "vegetarian"
  | "vegan"
  | "glutenFree"
  | "dairyFree"
  | "veryHealthy"
  | "cheap"
  | "veryPopular"
  | "sustainable"
  | "lowFodmap";

const RecipeBrief = ({
  title,
  dishTypes = [],
  diets = [],
  readyInMinutes,
  servings,
  image,
  ...props
}: RecipeProps) => {
  const {} = props;
  return (
    <div className={styles.briefInfo}>
      <div className={styles.left}>
        <h1 className={styles.recipeName}>{title}</h1>
        <div className={styles.labelGroup}>
          {!!dishTypes.length &&
            dishTypes.map((type: any, index: number) => {
              return (
                <Badge
                  key={index}
                  className={styles.label}
                  color={badgeColors(index)}
                  size="sm"
                  radius="sm"
                >
                  {type}
                </Badge>
              );
            })}
        </div>
        <div className={styles.dietInfoYield}>
          <div className={styles.dietInfoGroup}>
            <div className={styles.dietInfo}>
              <TbBrandGoogleAnalytics />
              <span>time:</span>
            </div>
            <span className={styles.dietTxt}>{readyInMinutes} minutes</span>
          </div>
          <div className={styles.dietInfoGroup}>
            <div className={styles.dietInfo}>
              <BsFillPeopleFill />
              <span>serving:</span>
            </div>
            <span className={styles.dietTxt}>{servings}</span>
          </div>
          <div className={styles.dietInfoGroup}>
            <div className={styles.dietInfo}>
              <GiForkKnifeSpoon />
              <span>diet:</span>
            </div>
            <span className={styles.dietTxt}>
              {diets.map((diet: any) => {
                return diet + "   ";
              })}
            </span>
          </div>
        </div>
        <div className={styles.judgeGroup}>
          {judgeItem.map((item) => (
            <div key={item} className={styles.judgeItem}>
              <span>{item}</span>
              {props[item as DietOption] ? (
                <img src="/correct.png" alt="correct" />
              ) : (
                <img src="/remove.png" alt="error" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <Image src={image} alt="recipe" fallbackSrc="/img_default.jepg" />
      </div>
    </div>
  );
};

export default RecipeBrief;