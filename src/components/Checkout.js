import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { stripePromise } from "../app/App";
import {
  fetchClientSecret,
  selectClientSecret,
  selectLoadingPayment,
  selectErrorPayment,
} from "../features/payment/paymentSlice";
import CheckoutForm from "./CheckoutForm";
import { Navigate } from "react-router-dom";

const Checkout = () => {
  // Client secret state
  const clientSecret = useSelector(selectClientSecret);
  const loadingPayment = useSelector(selectLoadingPayment);
  const errorPayment = useSelector(selectErrorPayment);

  const dispatch = useDispatch();

  // Create PaymentIntent as soon as the page loads
  useEffect(() => {
    dispatch(fetchClientSecret());
  }, [dispatch]);

  // PaymentIntent appearance and options
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  // Show loading spinner when loading
  if (loadingPayment)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ padding: "3.65em 9.4em" }}
      >
        <CircularProgress />
      </Box>
    );

  // Navigate to dashboard (To fill out address) and show error message
  if (errorPayment) return <Navigate to="/dashboard" />;

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
