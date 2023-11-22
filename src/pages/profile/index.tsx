import { Center, Paper, Title } from "@mantine/core";
import styles from "./profile.module.scss";
import { useState } from "react";
import Userinfo from "./components/userinfo";
import MyRecipes from "./components/myRecipes";
import { data } from "./components/data";

const nav = [
  {
    index: 0,
    text: "Profile",
  },
  {
    index: 1,
    text: "Recipes",
  },
];
function Profile() {
  const [index, setIndex] = useState(0);

  const handleTabs = (i: number) => {
    if (i !== index) {
      setIndex(i);
    }
  };
  return (
    <div className={styles.profilePage}>
      <Paper shadow="xl" radius="lg" className={styles.container}>
        <div className={styles.left}>
          {nav.map((item) => (
            <Center
              className={styles.navItem}
              mb={30}
              key={item.index}
              onClick={() => handleTabs(item.index)}
            >
              <Title
                order={4}
                className={item.index === index ? styles.active : undefined}
              >
                {item.text}
              </Title>
            </Center>
          ))}
        </div>
        <div className={styles.main}>
          {index === 0 ? <Userinfo /> : <MyRecipes recipes={data} />}
        </div>
      </Paper>
    </div>
  );
}

export default Profile;
