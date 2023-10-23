import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import RecipeList from "pages/recipe/recipe-list";

export const HOME = "/";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipes",
    element: <RecipeList />,
  },
]);

export default routerConfig;
