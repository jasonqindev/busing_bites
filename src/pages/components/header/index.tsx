import {
  ABOUT_US_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  PROFILE_PAGE,
  RECIPES_ANALYST_PAGE,
  RECIPES_CREATE_PAGE,
  RECIPES_PAGE,
} from "const";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Image,
  Menu,
  Text,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import styles from "./header.module.scss";
import { useAuth } from "context/auth-context";
import { FC } from "react";

const navBar = [
  { title: "Home", href: HOME_PAGE },
  { title: "Recipe list", href: RECIPES_PAGE },
  { title: "Recipe Analyst", href: RECIPES_ANALYST_PAGE },
  { title: "Recipe Create", href: RECIPES_CREATE_PAGE },
  { title: "About Us", href: ABOUT_US_PAGE },
];

interface PropsType {
  isHome?: boolean;
}

const Header: FC<PropsType> = ({ isHome = false }) => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const { currentUser, signOut } = useAuth();

  return (
    <header className={`${styles.header} ${isHome ? styles.homeHeader : ""}`}>
      <Group>
        <Box
          className={styles.logo}
          mr={100}
          onClick={() => {
            nav(HOME_PAGE);
          }}
        >
          <Image src="/images/logo_s.png" />
        </Box>

        <Box className={styles.navbar}>
          {navBar.map((nav, index) => (
            <Box key={nav.title} className={styles.navItem}>
              <Link
                className={pathname === nav.href ? styles.active : ""}
                to={nav.href}
              >
                {nav.title}
              </Link>
              {index + 1 < navBar.length && (
                <Divider orientation="vertical" ml={20} />
              )}
            </Box>
          ))}
        </Box>
      </Group>

      <Menu shadow="md" width={120} withArrow>
        <Menu.Target>
          <Avatar color="cyan" radius="xl" style={{ cursor: "pointer" }}>
            MK
          </Avatar>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<BsFillPeopleFill size={20} />}
            onClick={() => {
              nav(PROFILE_PAGE);
            }}
          >
            <Text ml={5}>Profile</Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="red"
            leftSection={<BiLogOut size={20} />}
            onClick={signOut}
          >
            <Text ml={5}>Logout</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* <Button
          onClick={() => {
            nav(LOGIN_PAGE);
          }}
        >
          Login
        </Button> */}
    </header>
  );
};

export default Header;
