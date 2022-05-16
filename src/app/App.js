import { Routes, Route } from "react-router-dom";

import "../App.css";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import ProductDetails from "../components/ProductDetails";
import Footer from "../components/Footer";
import ProductsError from "../components/ProductsError";

function App() {
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
