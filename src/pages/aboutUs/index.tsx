import { Paper, Title } from "@mantine/core";
import styles from "./aboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={styles.page}>
      <Paper shadow="xl" radius="lg" className={styles.container}>
        <Title>About Us</Title>
      </Paper>
    </div>
  );
};

export default AboutUs;
