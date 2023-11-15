import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "./echarts";

import App from "./App";
import { AuthProvider } from "context/auth-context";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </Provider>
  // </React.StrictMode>,
);
