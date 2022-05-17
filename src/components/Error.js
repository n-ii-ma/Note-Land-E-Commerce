import { useState, useEffect, forwardRef } from "react";
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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Error = () => {
  // Snackbar state
  const [open, setOpen] = useState(false);
  // Error message state
  const [errorMessage, setErrorMessage] = useState("");

  // Products
  const errorProducts = useSelector(selectAllErrorProducts);

  // Product
  const errorProduct = useSelector(selectOneErrorProduct);
  const productErrorMessage = useSelector(selectErrorMessageProduct);

  // Users
  const errorUsers = useSelector(selectErrorUsers);
  const usersErrorMessage = useSelector(selectErrorMessageUsers);

  // Change error message state based on the api error messages
  useEffect(() => {
    if (
      productErrorMessage &&
      typeof productErrorMessage.error !== "undefined"
    ) {
      setErrorMessage(productErrorMessage.error.message);
    } else if (usersErrorMessage) {
      setErrorMessage(
        usersErrorMessage.error
          ? usersErrorMessage.error.message
          : usersErrorMessage.message
      );
    }
  }, [productErrorMessage, usersErrorMessage]);

  // Show snackbar if all or one components throws an error
  useEffect(() => {
    if (errorProducts || errorProduct || errorUsers) {
      setOpen(true);
    }
  }, [errorProducts, errorProduct, errorUsers]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error" sx={{ alignItems: "center" }}>
        {errorMessage ? errorMessage : "Failed to Load the Resources"}
      </Alert>
    </Snackbar>
  );
};

export default Error;
