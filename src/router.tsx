import AboutUs from "pages/aboutUs";
import AuthLayout from "pages/auth/layout";
import DailyRecipe from "pages/recipe/recipe-analyst";
import Home from "./pages/home";
import Login from "pages/auth/login";
import Logout from "pages/auth/logout";
import NotFound from "pages/exceptionPage/notFound";
import RecipeCreate from "pages/recipe/recipe-create";
import RecipeDetail from "pages/recipe/recipe-detail";
import RecipeLayout from "pages/layout/recipeLayout";
import RecipeList from "pages/recipe/recipe-list";
import Register from "pages/auth/register";
import Verify from "pages/auth/verify";
import ForgotPassword from "pages/auth/forgot";
import Profile from "pages/profile";
import MyRecipeDetail from "pages/recipe/own-recipe-detail";

import { Navigate, createBrowserRouter } from "react-router-dom";

export const HOME = "/";

const routerConfig = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
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
          {
            path: "my/:id",
            element: <MyRecipeDetail />,
          },
        ],
      },
      {
        element: <RecipeLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "/profile",
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
        path: "/auth",
        children: [
          {
            path: "",
            element: <Navigate to="login" />,
          },
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
            element: <Logout />,
          },
          {
            path: "forgot",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routerConfig;
