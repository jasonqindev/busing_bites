import { Card, Image, Text, Badge, Group } from "@mantine/core";
import styles from "./components.module.scss";
import { RecipeCardProps } from "types/recipeAjax";
import { badgeColors } from "utils";
import { IoMdTime } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { cookingDifficulty } from "../utils";
import { useNavigate } from "react-router-dom";
const RecipeCard = ({
  id,
  image,
  title,
  dishTypes = [],
  readyInMinutes,
  servings,
}: RecipeCardProps) => {
  const nav = useNavigate();
  const handleShowDetail = () => {
    nav(`/recipes/${id}`);
  };
  return (
    <Card
      className={styles.cardContainer}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={handleShowDetail}
    >
      <Card.Section>
        <Image className={styles.recipeImg} src={image} alt={title} />
      </Card.Section>

      <Text className={styles.title} fw={500} truncate="end">
        {title}
      </Text>

      <Group className={styles.introductionGroup}>
        <div className={styles.introduction}>
          <IoMdTime />
          <Text size="xs">{readyInMinutes} minutes</Text>
        </div>
        <div className={styles.introduction}>
          <TbBrandGoogleAnalytics />
          <Text size="xs">{cookingDifficulty(readyInMinutes)}</Text>
        </div>
        <div className={styles.introduction}>
          <BsFillPeopleFill />
          <Text size="xs">{servings} serving</Text>
        </div>
      </Group>

      <div className={styles.labelGroup}>
        {!!dishTypes.length &&
          dishTypes.map((type, index) => {
            return (
              <Badge
                key={index}
                className={styles.label}
                color={badgeColors(index)}
                size="xs"
                radius="sm"
              >
                {type}
              </Badge>
            );
          })}
      </div>
    </Card>
  );
};

export default RecipeCard;
