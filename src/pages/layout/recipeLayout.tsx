import Header from "pages/components/header";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./layout.module.scss";
import { HOME_PAGE } from "const";

const RecipeLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.page}>
      <Header isHome={pathname === HOME_PAGE} />
      <Outlet />
    </div>
  );
};

export default RecipeLayout;
