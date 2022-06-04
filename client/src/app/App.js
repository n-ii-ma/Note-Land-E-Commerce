import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

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

// Test publishable API key
export const stripePromise = loadStripe(
  "pk_test_51L65vtDWUSKm7MVsZEhJewIDF7jhrNAniDpjNZf4fT3vFP79bLVscoERJ7QkBokECw7LKxSShEWMDqmrW0Z7TKG100vyRH3Zh2"
);

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

  // Protected routes for not logged in users
  const ProtectedRoutes = ({ children, redirectTo }) => {
    return loggedInState ? children : <Navigate to={redirectTo} />;
  };

  // Restricted routes for logged in users
  const RestrictedRoutes = ({ children, redirectTo }) => {
    return !loggedInState ? children : <Navigate to={redirectTo} />;
  };

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
          <Route
            path="/auth/login"
            element={
              <RestrictedRoutes redirectTo="/">
                <Login />
              </RestrictedRoutes>
            }
          />
          <Route
            path="/auth/register"
            element={
              <RestrictedRoutes redirectTo="/">
                <Register />
              </RestrictedRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes redirectTo="/auth/login">
                <Dashboard />
              </ProtectedRoutes>
            }
          />
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
