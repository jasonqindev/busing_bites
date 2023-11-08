import { FC } from "react";
import styles from "./components.module.scss";
import { Title } from "@mantine/core";
import { useGetAnalysts } from "hooks/useGetAnalysts";

const NutritionAnalyst: FC = () => {
  const { analysts } = useGetAnalysts();

  return (
    <div className={styles.calculatorContainer}>
      <Title order={2}>Nutrition Analyst</Title>
    </div>
  );
};

export default NutritionAnalyst;
