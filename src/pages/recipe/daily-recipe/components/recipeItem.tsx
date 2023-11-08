import styles from "./components.module.scss";
import { Image, Text } from "@mantine/core";
import { FC } from "react";
import { RecipeCardProps } from "types/recipeAjax";

const RecipeItem: FC<Partial<RecipeCardProps>> = ({ title, image }) => {
  return (
    <div className={styles.recipeItem}>
      <Image src={image} className={styles.img} />
      <Text ml={20}>{title}</Text>
    </div>
  );
};

export default RecipeItem;
