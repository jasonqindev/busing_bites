import { FC } from "react";
import styles from "./components.module.scss";
import { Title } from "@mantine/core";

const NutritionCalculator: FC = () => {
  return (
    <div className={styles.calculatorContainer}>
      <Title order={2}>Nutrition Analyst</Title>
    </div>
  );
};

export default NutritionCalculator;
