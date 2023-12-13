import { Paper, Title } from "@mantine/core";
import styles from "./carrers.module.scss";


const CarrersPage = () => {
  return (
    <div className={styles.page}>
      <Paper shadow="xl" radius="lg" className={styles.container}>
        <Title>Want to join our cause ? </Title>
      </Paper>
    </div>
  );
};

export default CarrersPage;