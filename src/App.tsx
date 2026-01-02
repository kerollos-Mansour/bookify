import "./App.css";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import PageLoader from "./components/UI/PageLoader";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import FavBarSection from "./components/favBar/favBar";
import { FavoritesProvider } from "./context/favoritesContext";
import { ToastProvider } from "./components/UI/ToastProvider/ToastProvider";
import { LocationSelector } from "./components/locationSelector/LocationSelector";
import { useLocation } from "./context/locationContext";

const LocationSelectorWrapper = () => {
  const { isSelectorOpen, closeSelector } = useLocation();
  return <LocationSelector isOpen={isSelectorOpen} onClose={closeSelector} />;
};

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
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {isPageLoading && <PageLoader />}
            {!hideLayout && <Header />}
            <FavBarSection />
            <main>
              <ScrollToTop />
              <LocationSelectorWrapper />
              <Outlet />
            </main>
            {!hideLayout && <Footer />}
          </div>
        </FavoritesProvider>
      </ToastProvider>
    </>
  );
}

export default App;
