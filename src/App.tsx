import { RouterProvider } from "react-router-dom";
import routerConfig from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <RouterProvider router={routerConfig} />
    </div>
  );
}

export default App;
