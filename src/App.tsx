import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import FeaturedStays, { featuredData } from "./components/FeaturedStays/FeaturedStays";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <FeaturedStays destinations={featuredData} />
      </main>
      <Footer />
    </>
  );
}

export default App;
