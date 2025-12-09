import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Categories from "../components/categories/categories";
import Home from "../pages/home/home";
import SearchResults from "../pages/searchResult/SearchResults";
import PaymentSuccess from "../pages/paymentSuccess/PaymentSuccess";
import BookingInfo from "../pages/paymentSuccess/BookingInfo";
import PropertyDetails from "../pages/propertyDetails/PropertyDetails";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import NotFound from "../pages/notFound/NotFound";
import Account from "../pages/account/account";
import ConfirmReservation from "../pages/paymentSuccess/ConfirmReservation";

export const router = createBrowserRouter([
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
