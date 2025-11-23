import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./components/categories/categories";
import Home from "./pages/home/home";

import SearchResults from "./pages/searchResult/searchResults";
import PaymentSuccess from "./pages/paymentSuccess/paymentSuccess";
import BookingInfo from "./pages/paymentSuccess/bookingInfo";
import PropertyDetails from "./pages/propertyDetails/propertyDetails";
import Login from "./pages/login/login";
import SignUp from "./pages/signUp/signUp";

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
      { path: "SignUp", element: <SignUp /> },
      { path: "/search", element: <SearchResults /> },
    ],
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
