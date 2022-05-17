import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "../App.css";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import ProductDetails from "../components/ProductDetails";
import Login from "../components/Login";
import Register from "../components/Register";
import Footer from "../components/Footer";
import Success from "../components/Success";
import Error from "../components/Error";

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
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
      <Success />
      <Error />
    </div>
  );
}

export default App;
