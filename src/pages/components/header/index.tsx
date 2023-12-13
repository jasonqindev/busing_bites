import {
  HOME_PAGE,
  LOGIN_PAGE,
  PROFILE_PAGE,
  RECIPES_ANALYST_PAGE,
  RECIPES_CREATE_PAGE,
  RECIPES_PAGE,
  default_avatar,
  ABOUT_US_PAGE,
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
  Input,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { FC } from "react";
import styles from "./header.module.scss";
import { useAuth } from "context/auth-context";

const navBar = [
  { title: "Home", href: HOME_PAGE },
  { title: "Browse Recipes", href: RECIPES_PAGE },
  { title: "Analyze", href: RECIPES_ANALYST_PAGE },
  { title: "Submit", href: RECIPES_CREATE_PAGE },
  { title: "About Us", href: ABOUT_US_PAGE },
];

interface PropsType {
  isHome?: boolean;
}

const Header: FC<PropsType> = ({ isHome = false }) => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const { currentUser, signOut } = useAuth();

  const handleSearch = (query: string) => {
    // Perform search logic here
    console.log("Searching for:", query);
  };

  return (
    <header className={`${styles.header} ${isHome ? styles.homeHeader : ""}`}>
      <Group>
        {!isHome && (
          <Box
            className={styles.logo}
            mr={100}
            onClick={() => {
              nav(HOME_PAGE);
            }}
          >
            <Image src="/images/logo_s.png" />
          </Box>
        )}

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

      {currentUser ? (
        <Menu shadow="md" width={120} withArrow>
          <Menu.Target>
            <Avatar
              src={currentUser.avatar ? currentUser.avatar : default_avatar}
              radius="xl"
              style={{ cursor: "pointer", background: "#f3f3f3" }}
            />
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
      ) : (
        <Button
          onClick={() => {
            nav(LOGIN_PAGE);
          }}
        >
          Login
        </Button>
      )}
    </header>
  );
};

export default Header;
