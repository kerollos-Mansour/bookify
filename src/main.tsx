import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import Home from "./pages/home/home";

import SearchResults from "./pages/SearchResult/SearchResults";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import BookingInfo from "./pages/PaymentSuccess/BookingInfo";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import Login from "./pages/Login/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "property", element: <PropertyDetails /> },
      { path: "booking-info", element: <BookingInfo /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "login", element: <Login /> },
    ],
  },
  {path: "/search", element: <SearchResults/>}
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
