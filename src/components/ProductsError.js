import { useState, useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectErrorProducts } from "../features/products/productsSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductsError = () => {
  const [open, setOpen] = useState(false);
  const errorProducts = useSelector(selectErrorProducts);

  useEffect(() => {
    if (errorProducts) {
      setOpen(true);
    }
  }, [errorProducts]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error" sx={{ alignItems: "center" }}>
        Failed to Load the Products
        <br />
        Please Consider Using a VPN
      </Alert>
    </Snackbar>
  );
};

export default ProductsError;
