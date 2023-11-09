import styles from "./components.module.scss";
import { Image, Text } from "@mantine/core";
import { FC } from "react";
import { RecipeCardProps } from "types/recipeAjax";

interface PropsType extends Partial<RecipeCardProps> {
  lineClamp?: number;
}

const RecipeItem: FC<PropsType> = ({ title, image, lineClamp = undefined }) => {
  return (
    <div className={styles.recipeItem}>
      <Image src={image} className={styles.img} />
      <Text ml={20} lineClamp={lineClamp}>
        {title}
      </Text>
    </div>
  );
};

export default RecipeItem;
