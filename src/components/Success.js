import { useState, useEffect, forwardRef, useRef } from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  selectUserMessage,
  selectUpdateMessage,
  selectRegisteredState,
  selectLoggedInState,
  selectUpdateState,
  selectLoggedOutState,
} from "../features/users/usersSlice";
import { selectCartMessage } from "../features/cart/cartSlice";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Success = () => {
  // Snackbar state
  const [open, setOpen] = useState(false);

  // Success message state
  const [successMessage, setSuccessMessage] = useState("");

  // Track whether the component has mounted or not
  const isMounted = useRef(false);

  // Users state
  const userMessage = useSelector(selectUserMessage);
  const updateMessage = useSelector(selectUpdateMessage);
  const registeredState = useSelector(selectRegisteredState);
  const loggedInState = useSelector(selectLoggedInState);
  const loggedOutState = useSelector(selectLoggedOutState);
  const updateState = useSelector(selectUpdateState);

  // Cart state
  const cartMessage = useSelector(selectCartMessage);

  // User success message
  useEffect(() => {
    if (userMessage?.message) {
      setSuccessMessage(userMessage.message);
    }
  }, [userMessage]);

  // User update success message
  useEffect(() => {
    if (updateMessage?.message) {
      setSuccessMessage(updateMessage.message);
    }
  }, [updateMessage]);

  // Cart success message
  useEffect(() => {
    if (cartMessage?.message) {
      setSuccessMessage(cartMessage.message);
    }
  }, [cartMessage]);

  // Show snackbar if all or one components succeeds
  // isMounted.current starts off as false so the first runthrough of the useEffect hook won’t call setOpen(true)
  // Instead, it will set isMounted.current to true
  // On subsequent runs of the hook, isMounted.current will be true and setOpen(true) will be executed
  useEffect(() => {
    if (isMounted.current) {
      if (
        registeredState ||
        loggedInState ||
        loggedOutState ||
        updateState ||
        cartMessage?.message
      ) {
        setOpen(true);
      }
    } else {
      setTimeout(() => (isMounted.current = true), 1000);
    }
  }, [
    registeredState,
    loggedInState,
    loggedOutState,
    updateState,
    cartMessage,
  ]);

  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="success" sx={{ alignItems: "center" }}>
        {successMessage ? successMessage : "Process Successful!"}
      </Alert>
    </Snackbar>
  );
};

export default Success;
