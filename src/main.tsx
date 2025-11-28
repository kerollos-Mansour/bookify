import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./components/categories/categories";
import Home from "./pages/home/home";

import SearchResults from "./pages/searchResult/SearchResults";
import PaymentSuccess from "./pages/paymentSuccess/paymentSuccess";
import BookingInfo from "./pages/paymentSuccess/bookingInfo";
import PropertyDetails from "./pages/propertyDetails/PropertyDetails";
import Login from "./pages/login/login";
import SignUp from "./pages/signUp/SignUp";
import NotFound from "./pages/notFound/NotFound";
import Account from "./pages/account/account";
import ConfirmReservation from "./pages/paymentSuccess/confirmReservation";

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
      { path: "confirm-reservation", element: <ConfirmReservation /> },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      { path: "search", element: <SearchResults /> },
      { path: "account", element: <Account /> },
      
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
