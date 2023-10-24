import SearchBox from "./componets/searchBox";
import styles from "./home.module.scss";

function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>The Recipe of Food Paradise!</h1>
        <SearchBox />
      </div>
    </div>
  );
}

export default Home;
