import { useState, useEffect, forwardRef, useRef } from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  selectAllErrorProducts,
  selectOneErrorProduct,
  selectErrorMessageProduct,
} from "../features/products/productsSlice";
import {
  selectErrorUsers,
  selectErrorMessageUsers,
} from "../features/users/usersSlice";
import {
  selectErrorCart,
  selectErrorMessageCart,
} from "../features/cart/cartSlice";
import {
  selectErrorPayment,
  selectErrorMessagePayment,
} from "../features/payment/paymentSlice";
import {
  selectErrorOrders,
  selectErrorMessageOrders,
} from "../features/orders/ordersSlice";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Error = () => {
  // Snackbar state
  const [open, setOpen] = useState(false);

  // Track whether the component has mounted or not
  const isMounted = useRef(false);

  // Error message state
  const [errorMessage, setErrorMessage] = useState("");

  // Products state
  const errorProducts = useSelector(selectAllErrorProducts);

  // Product state
  const errorProduct = useSelector(selectOneErrorProduct);
  const productErrorMessage = useSelector(selectErrorMessageProduct);

  // Users state
  const errorUsers = useSelector(selectErrorUsers);
  const usersErrorMessage = useSelector(selectErrorMessageUsers);

  // Cart state
  const errorCart = useSelector(selectErrorCart);
  const cartErrorMessage = useSelector(selectErrorMessageCart);

  // Payment state
  const errorPayment = useSelector(selectErrorOrders);
  const paymentErrorMessage = useSelector(selectErrorMessagePayment);

  // Orders state
  const errorOrders = useSelector(selectErrorPayment);
  const ordersErrorMessage = useSelector(selectErrorMessageOrders);

  // Product error message
  useEffect(() => {
    if (productErrorMessage) {
      setErrorMessage(
        productErrorMessage.error
          ? productErrorMessage.error.message
          : productErrorMessage.message
      );
    }
  }, [productErrorMessage]);

  // Users error message
  useEffect(() => {
    if (usersErrorMessage) {
      setErrorMessage(
        usersErrorMessage.error
          ? usersErrorMessage.error.message
          : usersErrorMessage.message
      );
    }
  }, [usersErrorMessage]);

  // Cart error message
  useEffect(() => {
    if (cartErrorMessage) {
      setErrorMessage(
        cartErrorMessage.error
          ? cartErrorMessage.error.message
          : cartErrorMessage.message
      );
    }
  }, [cartErrorMessage]);

  // Payment error message
  useEffect(() => {
    if (paymentErrorMessage) {
      setErrorMessage(
        paymentErrorMessage.error
          ? paymentErrorMessage.error.message
          : paymentErrorMessage.message
      );
    }
  }, [paymentErrorMessage]);

  // Orders error message
  useEffect(() => {
    if (ordersErrorMessage) {
      setErrorMessage(
        ordersErrorMessage.error
          ? ordersErrorMessage.error.message
          : ordersErrorMessage.message
      );
    }
  }, [ordersErrorMessage]);

  // Show snackbar if all or one components throws an error
  useEffect(() => {
    if (errorProducts || errorProduct) {
      setOpen(true);
    }
  }, [errorProducts, errorProduct]);

  // Show snackbar if all or one components throws an error
  // isMounted.current starts off as false so the first runthrough of the useEffect hook won’t call setOpen(true)
  // Instead, it will set isMounted.current to true
  // On subsequent runs of the hook, isMounted.current will be true and setOpen(true) will be executed
  useEffect(() => {
    if (isMounted.current) {
      if (errorUsers || errorCart || errorPayment || errorOrders) {
        setOpen(true);
      }
    } else {
      setTimeout(() => (isMounted.current = true), 1000);
    }
  }, [errorUsers, errorCart, errorPayment, errorOrders]);

  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error" sx={{ alignItems: "center" }}>
        {errorMessage ? errorMessage : "Failed to Load the Resources"}
      </Alert>
    </Snackbar>
  );
};

export default Error;
