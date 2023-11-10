import { FC } from "react";
import styles from "./exception.module.scss";

const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <img src="/images/404.jpg" alt="404" />
    </div>
  );
};

export default NotFound;
