import AuthLayout from "pages/auth/layout";
import Home from "./pages/home";
import Login from "pages/auth/login";
import NotFound from "pages/exceptionPage/NotFound";
import RecipeDetail from "pages/recipe/recipe-detail";
import RecipeLayout from "pages/layout/recipeLayout";
import RecipeList from "pages/recipe/recipe-list";
import Register from "pages/auth/register";
import { createBrowserRouter } from "react-router-dom";

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
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routerConfig;
