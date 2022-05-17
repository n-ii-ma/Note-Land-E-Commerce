import { useState, useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  selectAllErrorProducts,
  selectOneErrorProduct,
  selectErrorMessageProduct,
} from "../features/products/productsSlice";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Error = () => {
  // Snackbar state
  const [open, setOpen] = useState(false);

  const errorProducts = useSelector(selectAllErrorProducts);
  const errorProduct = useSelector(selectOneErrorProduct);
  const errorMessage = useSelector(selectErrorMessageProduct);

  // Show snackbar if all or one product throws an error
  useEffect(() => {
    if (errorProducts || errorProduct) {
      setOpen(true);
    }
  }, [errorProducts, errorProduct]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error" sx={{ alignItems: "center" }}>
        {errorMessage && typeof errorMessage.error !== "undefined"
          ? errorMessage.error.message
          : "Failed to Load the Resources"}
      </Alert>
    </Snackbar>
  );
};

export default Error;
