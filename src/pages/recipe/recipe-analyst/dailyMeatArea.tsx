import styles from "./nutritionAnalyst.module.scss";
import DropBox from "components/dnd/dropBox";
import { Box, Button, Center, Title } from "@mantine/core";
import { FC } from "react";
import { RecipeCardProps } from "types/recipeAjax";
import RecipeItem from "./components/recipeItem";
import { RiDeleteBin5Line } from "react-icons/ri";

const planArea = ["breakfast", "lunch", "dinner"];

interface PropsType {
  breakfastList: RecipeCardProps[];
  lunchList: RecipeCardProps[];
  dinnerList: RecipeCardProps[];
  reportModalStatus: boolean;
  changeReportModal: (status: boolean) => void;
  deleteFromArea: (r_id: number, areaId: string) => void;
}

const DailyMeatArea: FC<PropsType> = ({
  breakfastList,
  lunchList,
  dinnerList,
  reportModalStatus,
  changeReportModal,
  deleteFromArea,
}) => {
  const btnStatus =
    breakfastList.length || dinnerList.length || lunchList.length;

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
                  <Box key={c.id} className={styles.recipeWrapper}>
                    <RiDeleteBin5Line
                      color="red"
                      size={30}
                      className={styles.delete}
                      onClick={() => {
                        deleteFromArea(c.id, area);
                      }}
                    />
                    <RecipeItem
                      lineClamp={2}
                      key={area + c.id}
                      title={c.title}
                      image={c.image}
                    />
                  </Box>
                ))}
              </div>
            </DropBox>
          </div>
        );
      })}
      <Center mt={50}>
        <Button
          color="teal"
          variant="filled"
          disabled={!btnStatus}
          size="md"
          radius="xl"
          onClick={() => {
            changeReportModal(!reportModalStatus);
          }}
        >
          Generate Daily Meat Report
        </Button>
      </Center>
    </div>
  );
};

export default DailyMeatArea;
