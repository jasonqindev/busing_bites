import { Center, Paper, Title } from "@mantine/core";
import styles from "./profile.module.scss";
import { useEffect, useState } from "react";
import UserinfoPage from "./components/userinfo";
import MyRecipes from "./components/myRecipes";
import { useLoadRecipesByUserId } from "hooks/useLoadRecipe";
import { useAuth } from "context/auth-context";

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
  const { recipes, run: loadRecipesByUserId } = useLoadRecipesByUserId();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      loadRecipesByUserId(currentUser.uid);
    }
  }, [currentUser]); //eslint-disable-line

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
          {index === 0 ? <UserinfoPage /> : <MyRecipes recipes={recipes} />}
        </div>
      </Paper>
    </div>
  );
}

export default Profile;
