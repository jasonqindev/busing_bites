import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App";
import store from "store";
import { Provider } from "react-redux";

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
