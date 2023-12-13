import OptionBox from "./components/optionBox";
import SearchBox from "./components/searchBox";
import styles from "./home.module.scss";
import { useState } from "react";

function Home() {
  const [panelStatus, setPanelStatus] = useState(() => {
    return window.location.search ? true : false;
  });

  const handlePanelStatus = (status: boolean) => {
    setPanelStatus(status);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>The Recipes of Food Paradise!</h1>
        <SearchBox
          panelStatus={panelStatus}
          handlePanelStatus={handlePanelStatus}
        />
        <OptionBox panelStatus={panelStatus} />I
      </div>
    </div>
  );
}

export default Home;
