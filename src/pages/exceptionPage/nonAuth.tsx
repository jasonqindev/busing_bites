import { FC } from "react";
import styles from "./exception.module.scss";

const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <img src="/images/non-auth.jpg" alt="non-auth" />
    </div>
  );
};

export default NotFound;
