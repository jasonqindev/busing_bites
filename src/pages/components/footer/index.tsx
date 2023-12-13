import {
  ABOUT_US_PAGE,
  HOME_PAGE,
  RECIPES_ANALYST_PAGE,
  RECIPES_CREATE_PAGE,
  RECIPES_PAGE,
  CARRER_PAGE, 
} from "const";
import { Box, Group, Text, Avatar } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";
import styles from "./footer.module.scss";

const navBar = [
  { title: "Home", href: HOME_PAGE },
  { title: "Recipe list", href: RECIPES_PAGE },
  { title: "Recipe Analyst", href: RECIPES_ANALYST_PAGE },
  { title: "Recipe Create", href: RECIPES_CREATE_PAGE },
  { title: "Carrers", href: CARRER_PAGE },
  { title: "About Us", href: ABOUT_US_PAGE },
  
];

interface PropsType {
  amiHome?: boolean;
}

const Footer: FC<PropsType> = ({ amiHome = false }) => {
  const { pathname } = useLocation();
  const nav = useNavigate();


  return (
    <footer className={`${styles.footer} ${amiHome ? styles.homeFooter : ""}`}>
      <Group>
        <Box
          className={styles.logo}
          mr={100}
          onClick={() => {
            nav(HOME_PAGE);
          }}
        ></Box>

        <Box className={styles.navbar}>
          {navBar
            .filter((nav) => !amiHome || (nav.title === "About Us" || nav.title === "Carrers"))
            .map((nav, index) => (
              <Box key={nav.title} className={styles.navItem}>
                <Link
                  className={pathname === nav.href ? styles.active : ""}
                  to={nav.href}
                >
                  {nav.title}
                </Link>
              </Box>
            ))}
        </Box>
      </Group> 
      <text className={styles.footerText} style={{ color: "white" }}>Bussing Bites © 2023, All rights reserved.</text> 
    </footer>
   
  );
};

export default Footer;
