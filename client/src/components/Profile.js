import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { deleteUser, selectOneUser } from "../features/users/usersSlice";
import { clearCart } from "../features/cart/cartSlice";
import { persistor } from "../index";

const Profile = () => {
  // Alert dialog state
  const [open, setOpen] = useState(false);

  // User state
  const userInfo = useSelector(selectOneUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Capitalize the first letter of the word/phrase
  const capitalize = (string) => {
    if (string) {
      return string
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      return;
    }
  };

  const handleDelete = () => {
    // Navigate to the home page
    if (location.pathname === "/dashboard") {
      navigate("/", { replace: true });
    }

    // Delete user
    dispatch(deleteUser(userInfo.user_id));

    // Clear cart
    dispatch(clearCart());

    // Purge redux-persist state 1 second after logout
    setTimeout(() => persistor.purge(), 1000);
  };

  return (
    <Box>
      <Box>
        <Typography
          marginBottom={5}
          variant="h6"
          component="h6"
          sx={{ fontFamily: "Montserrat", fontWeight: 600 }}
        >
          Welcome {capitalize(userInfo.first_name)}{" "}
          {capitalize(userInfo.last_name)}
        </Typography>
      </Box>
      <Box>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          sx={{
            wordWrap: "break-word",
          }}
        >
          <strong>Email: </strong>
          {userInfo.email}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          sx={{
            wordWrap: "break-word",
          }}
        >
          <strong>Address: </strong>
          {capitalize(userInfo.address)}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          sx={{
            wordWrap: "break-word",
          }}
        >
          <strong>City: </strong>
          {capitalize(userInfo.city)}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          sx={{
            wordWrap: "break-word",
          }}
        >
          <strong>Postal Code: </strong>
          {userInfo.postal_code}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          sx={{
            wordWrap: "break-word",
          }}
        >
          <strong>Phone Number: </strong>
          {userInfo.phone}
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: "2em" }}
          onClick={() => setOpen(true)}
        >
          Delete Account
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} autoFocus color="error">
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Profile;
