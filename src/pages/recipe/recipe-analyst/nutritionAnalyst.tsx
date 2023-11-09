import { FC, useEffect } from "react";
import styles from "./nutritionAnalyst.module.scss";
import {
  Box,
  Title,
  RingProgress,
  Text,
  Blockquote,
  Center,
} from "@mantine/core";
import { useGetRecipeAnalyst } from "hooks/useGetRecipeAnalyst";
import ChartBox from "./components/pieChart";
import ProgressBox from "./components/progress";
import { MdTipsAndUpdates } from "react-icons/md";
import { nutrientColor, nutritionTips } from "./utils";
import GlycemicInfo from "./components/glycemicInfo";
import { useLoadNutritionInfo } from "hooks/useLoadRecipe";
import PlaceholderComp from "components/placeholderComp";

const NutritionAnalyst: FC = () => {
  const { selectedId } = useGetRecipeAnalyst();
  const { run: getNutritionInfo, recipeAnalyst } = useLoadNutritionInfo();

  useEffect(() => {
    if (selectedId) {
      getNutritionInfo(selectedId);
    }
    // eslint-disable-next-line
  }, [selectedId]);

  if (!recipeAnalyst) {
    return (
      <div className={styles.calculatorContainer}>
        <PlaceholderComp
          img="/images/analyst.jpg"
          title="click a recipe to show the analyst"
          imgHeight={300}
        />
      </div>
    );
  }
  const { nutrients = [], properties = [], caloricBreakdown } = recipeAnalyst;
  const [gIndex, gLoad, score] = properties;

  return (
    <div className={styles.calculatorContainer}>
      <Title order={2} mb={30}>
        Nutrition Analyst
      </Title>
      <Box>
        <ChartBox
          caloricBreakdown={caloricBreakdown}
          title="Caloric breakdown from recipe"
        />
      </Box>
      <Box mb={30}>
        <Title order={2} mb={20}>
          Percent of daily needs
        </Title>
        {nutrients.map((n, index) => (
          <ProgressBox {...n} key={index} />
        ))}
      </Box>
      <Box mb={30}>
        <Title order={2} mb={20}>
          Glycemic Information
        </Title>
        <GlycemicInfo gIndex={gIndex} gLoad={gLoad} />
      </Box>
      <Box>
        <Title order={2} mb={20}>
          Nutrition Score
        </Title>
        <Center>
          <RingProgress
            roundCaps
            size={160}
            sections={[
              { value: score.amount, color: nutrientColor(score.amount) },
            ]}
            label={
              <Text c={nutrientColor(score.amount)} ta="center">
                <Text fw={700} fz={25} component="span">
                  {Math.round(score.amount)}%
                </Text>
              </Text>
            }
          />
        </Center>
        <Blockquote
          color={nutrientColor(score.amount)}
          cite="– Team 18"
          icon={<MdTipsAndUpdates />}
          mt="xl"
        >
          {nutritionTips(score.amount)}
        </Blockquote>
      </Box>
    </div>
  );
};

export default NutritionAnalyst;
