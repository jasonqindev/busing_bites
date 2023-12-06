import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "./echarts";

import App from "./App";
import ReactDOM from "react-dom/client";
import { AppProviders } from "context";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <StrictMode>
  <AppProviders>
    <App />
  </AppProviders>
  // </StrictMode>
);
