import styles from "./components.module.scss";
import { FC } from "react";
import { Image, Title } from "@mantine/core";

interface PropsType {
  img?: string;
  imgHeight?: number;
  title?: string;
}

const PlaceholderComp: FC<PropsType> = ({ img, title, imgHeight }) => {
  return (
    <div className={styles.placeholderContainer}>
      {img && <Image radius="md" src={img} height={imgHeight ?? undefined} />}
      {title && (
        <Title order={5} ta={"center"} mt={10}>
          {title}
        </Title>
      )}
    </div>
  );
};

export default PlaceholderComp;
