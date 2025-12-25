import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/routes";
import { Provider } from "react-redux";
import{store} from './store/store'
import { AuthProvider } from "./context/authContext";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
