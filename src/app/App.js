import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "../App.css";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import ProductDetails from "../components/ProductDetails";
import Footer from "../components/Footer";
import ProductsError from "../components/ProductsError";

function App() {
  // Scroll to top on every transition custom hook
  const useScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  };
  useScrollToTop();

  return (
    <div className="App">
      <div>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <ProductsList />
              </>
            }
          />
          <Route path="/product/:product_id" element={<ProductDetails />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
      <ProductsError />
    </div>
  );
}

export default App;
