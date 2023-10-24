import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import RecipeList from "pages/recipe/recipe-list";
import RecipeDetail from "pages/recipe/recipe-detail";
import NotFound from "pages/exceptionPage/NotFound";
import RecipeLayout from "pages/layout/recipeLayout";

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
    path: "*",
    element: <NotFound />,
  },
]);

export default routerConfig;
