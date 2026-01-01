import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";
import { LocationProvider } from "./context/locationContext";
import { SocketProvider } from "./context/SocketContext";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <LocationProvider>
          <AuthProvider>
            <SocketProvider>
              <RouterProvider router={router} />
            </SocketProvider>
          </AuthProvider>
        </LocationProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
