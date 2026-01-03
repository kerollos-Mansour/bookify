import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Categories from "../components/categories/categories";
import Home from "../pages/home/home";
import SearchResults from "../pages/searchResult/SearchResults";
import PaymentSuccess from "../pages/paymentSuccess/PaymentSuccess";
import BookingInfo from "../pages/paymentSuccess/BookingInfo";
import PropertyDetails from "../pages/propertyDetails/PropertyDetails";
import Login from "../pages/login/login";
import SignUp from "../pages/signUp/SignUp";
import NotFound from "../pages/notFound/NotFound";
import Account from "../pages/account/account";
import Checkout from "../pages/checkout/checkout";
import ProtectedRoute from "../components/auth/protectedRoute";
import AboutUs from "../pages/aboutUs/aboutUs";
import ContactUs from "../pages/contactUs/contactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "aboutUs", element: <AboutUs /> },  // 
      { path: "contactUs", element: <ContactUs /> },  //

      { path: "property/:id", element: <PropertyDetails /> },
      { path: "search", element: <SearchResults /> },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
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
