import AboutUs from "pages/aboutUs";
import AuthLayout from "pages/auth/layout";
import DailyRecipe from "pages/recipe/recipe-analyst";
import Home from "./pages/home";
import Login from "pages/auth/login";
import Logout from "pages/auth/logout";
import NotFound from "pages/exceptionPage/NotFound";
import RecipeCreate from "pages/recipe/recipe-create";
import RecipeDetail from "pages/recipe/recipe-detail";
import RecipeLayout from "pages/layout/recipeLayout";
import RecipeList from "pages/recipe/recipe-list";
import Register from "pages/auth/register";
import Verify from "pages/auth/verify";
import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "pages/auth/forgot";
import Profile from "pages/profile";

export const HOME = "/";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "recipes",
    element: <RecipeLayout />,
    children: [
      {
        path: "",
        element: <RecipeList />,
      },
      {
        path: ":id",
        element: <RecipeDetail />,
      },
      {
        path: "analyst",
        element: <DailyRecipe />,
      },
      {
        path: "create",
        element: <RecipeCreate />,
      },
    ],
  },
  {
    path: "",
    element: <RecipeLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/aboutUs",
    element: <RecipeLayout />,
    children: [
      {
        path: "",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify",
        element: <Verify />,
      },
      {
        path: "logout",
        element: <Logout/>
      },
      {
        path: "forgot",
        element: <ForgotPassword/>
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routerConfig;
