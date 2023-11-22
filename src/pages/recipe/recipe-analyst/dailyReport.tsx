import styles from "./nutritionAnalyst.module.scss";
import { Drawer, Title } from "@mantine/core";
import { useGetRecipeAnalyst } from "hooks/useGetRecipeAnalyst";
import { useLoadBulkRecipeInfo } from "hooks/useLoadRecipe";
import { FC, useEffect } from "react";
import ProgressBox from "./components/progress";

interface PropsType {
  status: boolean;
  onCloseModal: () => void;
}

const DailyReport: FC<PropsType> = ({ status, onCloseModal }) => {
  const { dailyMeatIds } = useGetRecipeAnalyst();
  const { run: getBulkRecipeInfo, nutrients } = useLoadBulkRecipeInfo();
  useEffect(() => {
    getBulkRecipeInfo(dailyMeatIds.join(","));
  }, [dailyMeatIds]); // eslint-disable-line

  const close = () => {
    onCloseModal();
  };

  return (
    <Drawer
      opened={status}
      onClose={close}
      position="right"
      size={800}
      transitionProps={{
        transition: "slide-left",
        duration: 250,
        timingFunction: "linear",
      }}
    >
      <div className={styles.drawerContainer}>
        <Title order={2} mb={30}>
          Daily Meat Report
        </Title>
        {nutrients.map((n, index) => (
          <ProgressBox {...n} key={index} />
        ))}
      </div>
    </Drawer>
  );
};

export default DailyReport;
