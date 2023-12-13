import { Blockquote, Title } from "@mantine/core";

import { BiDish } from "react-icons/bi";
import styles from "./components.module.scss";

const Ingredients = ({ extendedIngredients = [] }: any) => {
  return (
    <div className={styles.ingredientsContainer}>
      <Title order={2} mb={50}>
        Ingredients
      </Title>
      <Blockquote
        color="blue"
        cite="—— Ingredients"
        icon={<BiDish />}
        mt="xl"
      >
        {extendedIngredients.map((ingredient: any, index: number) => {
          return (
            <div key={index} className={styles.eachIngredient}>
              <span></span>
              <div>{ingredient.original}</div>
            </div>
          );
        })}
      </Blockquote>
    </div>
  );
};

export default Ingredients;
