import Header from "pages/components/header";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";

const RecipeLayout = () => {
  return (
    <div className={styles.recipeMain}>
      <Header />
      <Outlet />
    </div>
  );
};

export default RecipeLayout;