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

  // Change success message state based on the api success messages
  useEffect(() => {
    if (userMessage?.message) {
      setSuccessMessage(userMessage.message);
    }

    if (updateMessage?.message) {
      setSuccessMessage(updateMessage.message);
    }
  }, [userMessage, updateMessage]);

  // Show snackbar if all or one components succeeds
  // isMounted.current starts off as false so the first runthrough of the useEffect hook won’t call setOpen(true)
  // Instead, it will set isMounted.current to true
  // On subsequent runs of the hook, isMounted.current will be true and setOpen(true) will be executed
  useEffect(() => {
    if (isMounted.current) {
      if (registeredState || loggedInState || loggedOutState || updateState) {
        setOpen(true);
      }
    } else {
      setTimeout(() => (isMounted.current = true), 1000);
    }
  }, [registeredState, loggedInState, loggedOutState, updateState]);

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
