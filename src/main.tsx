import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./components/categories/categories";
import Home from "./pages/home/home";

import SearchResults from "./pages/searchResult/SearchResults";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
import BookingInfo from "./pages/paymentSuccess/BookingInfo";
import PropertyDetails from "./pages/propertyDetails/PropertyDetails";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "property/:id", element: <PropertyDetails /> },
      { path: "booking-info", element: <BookingInfo /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      { path: "search", element: <SearchResults /> },
    ],
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
