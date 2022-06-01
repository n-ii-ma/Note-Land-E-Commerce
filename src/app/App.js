import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import "../App.css";
import { selectUser, selectLoggedInState } from "../features/users/usersSlice";
import { getCartProducts, selectRefreshCart } from "../features/cart/cartSlice";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import ProductDetails from "../components/ProductDetails";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import CartList from "../components/CartList";
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

  // Refresh cart state
  const refreshCart = useSelector(selectRefreshCart);

  // Users state
  const user = useSelector(selectUser);
  const loggedInState = useSelector(selectLoggedInState);

  const dispatch = useDispatch();

  // Get cart products when cart is refreshed
  useEffect(() => {
    if (loggedInState && refreshCart) {
      dispatch(getCartProducts(user.user.user_id));
    }
  }, [dispatch, loggedInState, refreshCart, user]);

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<CartList />} />
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
