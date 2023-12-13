import { Image } from "@mantine/core";
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
        <div className={styles.logo}>
          <Image src="/images/logo.png" />
        </div>
        <h1 className={styles.title}>
          Let's explore the tastes of the world together!
        </h1>
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
