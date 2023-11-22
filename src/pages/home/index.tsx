import { useState } from "react";
import SearchBox from "./components/searchBox";
import styles from "./home.module.scss";
import OptionBox from "./components/optionBox";
import { Image } from "@mantine/core";

function Home() {
  const [panelStatus, setPanelStatus] = useState(() => {
    return window.location.search ? true : false;
  });

  const handlePanelStatus = (status: boolean) => {
    setPanelStatus(status);
  };

  return (
    <div className={styles.homePage}>
      <Image className={styles.logo} src={"/images/logo.png"} />
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>The Recipe of Food Paradise!</h1>
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
