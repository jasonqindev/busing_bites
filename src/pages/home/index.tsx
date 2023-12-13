import { useState } from "react";
import SearchBox from "./components/searchBox";
import styles from "./home.module.scss";
import OptionBox from "./components/optionBox";

function Home() {
  const [panelStatus, setPanelStatus] = useState(() => {
    return window.location.search ? true : false;
  });

  const handlePanelStatus = (status: boolean) => {
    setPanelStatus(status);
  };

  return (
    <div className={styles.homePage}>
         <div className={styles.logo}>
          <img
            src="/images/logo.png" height={250}
          />
        </div>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Let's expore the tastes of the world together!</h1>
        <SearchBox
          panelStatus={panelStatus}
          handlePanelStatus={handlePanelStatus}
        />
        <OptionBox panelStatus={panelStatus} />
      </div>
      
    </div>
  );
}

export default Home;
