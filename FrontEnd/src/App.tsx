import "./App.css";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import PageLoader from "./components/UI/PageLoader";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import FavBarSection from "./components/favBar/favBar";
import { FavoritesProvider } from "./context/favoritesContext";
import { ToastProvider } from "./components/UI/ToastProvider/ToastProvider";

function App() {
  const navigation = useNavigation();
  const isPageLoading =
    navigation.state === "loading" || navigation.state === "submitting";

  const hideLayoutPages = [
    "/booking-info",
    "/confirm-reservation",
    "/payment-success",
  ];
  const hideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <>
      <ToastProvider>
        <FavoritesProvider>
          {isPageLoading && <PageLoader />}
          {!hideLayout && <Header />}
          <FavBarSection items={[]} />
          <main>
            <ScrollToTop />
            <Outlet />
          </main>
          {!hideLayout && <Footer />}
        </FavoritesProvider>
      </ToastProvider>
    </>
  );
}

export default App;
