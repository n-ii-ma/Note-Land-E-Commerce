import { useState, useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  selectUser,
  selectRegisteredState,
  selectLoggedInState,
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

  const user = useSelector(selectUser);
  const registeredState = useSelector(selectRegisteredState);
  const loggedInState = useSelector(selectLoggedInState);
  const loggedOutState = useSelector(selectLoggedOutState);

  // Change success message state based on the api success messages
  useEffect(() => {
    if (user?.message) {
      setSuccessMessage(user.message);
    }
  }, [user]);

  // Show snackbar if all or one components succeeds
  useEffect(() => {
    if (registeredState || loggedInState || loggedOutState) {
      setOpen(true);
    }
  }, [registeredState, loggedInState, loggedOutState]);

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
