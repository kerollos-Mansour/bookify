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
import Checkout from "../pages/checkout/checkout";
import ProtectedRoute from "../components/auth/protectedRoute";
import GuestRoute from "../components/auth/guestRoute";
import ContactUs from "../pages/contactUs/contactUs";
import AboutUs from "../pages/aboutUs/aboutUs";
import AuthCallback from "../pages/auth/callback/AuthCallback";
import ForgotPassword from "../pages/forgotPassword/forgotPassword";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import FlightSearchResults from "../pages/flightSearch/FlightSearchResults";
import ReturningFlightSelection from "../pages/flightSearch/ReturningFlightSelection";
import FlightPassengers from "../pages/flightPassengers/FlightPassengers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "aboutUs", element: <AboutUs /> }, //
      { path: "contactUs", element: <ContactUs /> }, //

      { path: "property/:id", element: <PropertyDetails /> },
      { path: "search", element: <SearchResults /> },
      { path: "flights/search", element: <FlightSearchResults /> },
      { path: "flights/returning", element: <ReturningFlightSelection /> },
      { path: "flights/passengers", element: <FlightPassengers /> },

      {
        element: <GuestRoute />, // Prevent authenticated users from accessing these pages
        children: [
          { path: "login", element: <Login /> },
          { path: "signUp", element: <SignUp /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset-password/:token", element: <ResetPassword /> },
        ],
      },

      { path: "contact-us", element: <ContactUs /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "/auth/callback", element: <AuthCallback /> },

      {
        element: <ProtectedRoute />, //all children are protected

        children: [
          { path: "booking-info", element: <BookingInfo /> },
          { path: "checkout", element: <Checkout /> },
          { path: "payment-success", element: <PaymentSuccess /> },
          { path: "account", element: <Account /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
