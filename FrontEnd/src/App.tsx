import "./App.css";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import PageLoader from "./components/UI/PageLoader";
import ScrollToTop from "./components/scrollToTop/scrollToTop";

function App() {
  const navigation = useNavigation();
  const isPageLoading =
    navigation.state === "loading" || navigation.state === "submitting";
  return (
    <>
      {isPageLoading && <PageLoader />}
      <Header />
      <main>
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
