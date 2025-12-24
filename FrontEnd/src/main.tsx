import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/routes";
import { Provider } from "react-redux";
import { store } from './store/store'
import { ThemeProvider } from "./context/themeContext";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
