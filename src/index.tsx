import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "context/auth-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <MantineProvider>
      <App />
    </MantineProvider>
  </AuthProvider>
  // </React.StrictMode>,
);
