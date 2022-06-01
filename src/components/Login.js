import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import {
  loginUser,
  selectUser,
  selectLoggedInState,
  selectLoadingUsers,
} from "../features/users/usersSlice";
import { getCartProducts } from "../features/cart/cartSlice";
import LoadingBackdrop from "./LoadingBackdrop";

const Login = () => {
  // Field states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Users state
  const user = useSelector(selectUser);
  const loggedInState = useSelector(selectLoggedInState);
  const loadingUsers = useSelector(selectLoadingUsers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Navigate to the homepage and get user's cart products if user gets logged in
  useEffect(() => {
    if (loggedInState) {
      dispatch(getCartProducts(user.user.user_id));
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate, loggedInState, user]);

  // On submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(loginUser({ email, password }));
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginTop: { xs: "6em", sm: "7em" } }}
    >
      <CssBaseline />
      {loadingUsers ? <LoadingBackdrop /> : ""}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/auth/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
