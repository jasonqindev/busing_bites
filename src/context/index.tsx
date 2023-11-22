import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "store";
import { MantineProvider } from "@mantine/core";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <MantineProvider>{children}</MantineProvider>
    </Provider>
  );
};
