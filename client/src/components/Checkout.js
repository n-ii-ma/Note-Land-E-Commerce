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
  selectErrorMessagePayment,
} from "../features/payment/paymentSlice";
import CheckoutForm from "./CheckoutForm";
import { Navigate } from "react-router-dom";

const Checkout = () => {
  // Client secret state
  const clientSecret = useSelector(selectClientSecret);
  const loadingPayment = useSelector(selectLoadingPayment);
  const errorPayment = useSelector(selectErrorPayment);
  const paymentErrorMessage = useSelector(selectErrorMessagePayment);

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
    loader: "always",
  };

  // Navigate to dashboard upon address error to fill out address
  if (
    errorPayment &&
    paymentErrorMessage?.error.message ===
      "Shipping Address Has Not Been Provided!"
  ) {
    return <Navigate to="/dashboard" />;
  }

  // Show loading spinner when loading or getting an error
  if (loadingPayment || errorPayment)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ padding: { xs: "3.65em 8.5em", sm: "3.65em 9.4em" } }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
