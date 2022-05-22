import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  registerUser,
  selectRegisteredState,
  selectLoadingUsers,
  clearRegistered,
} from "../features/users/usersSlice";
import LoadingBackdrop from "./LoadingBackdrop";
import schema from "../config/validationSchema";

const Register = () => {
  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Users state
  const registeredState = useSelector(selectRegisteredState);
  const loadingUsers = useSelector(selectLoadingUsers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Navigate to the login page if user registers successfully
  useEffect(() => {
    if (registeredState) {
      navigate("/auth/login", { replace: true });

      // Clear register state so that a not signed in user can navigate to the register page
      dispatch(clearRegistered());
    }
  }, [navigate, dispatch, registeredState]);

  // On submit
  const onSubmit = ({ first_name, last_name, email, password }) => {
    dispatch(registerUser({ first_name, last_name, email, password }));
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
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("first_name")}
                error={errors.first_name && true}
                helperText={errors.first_name?.message}
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("last_name")}
                error={errors.last_name && true}
                helperText={errors.last_name?.message}
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("email")}
                error={errors.email && true}
                helperText={errors.email?.message}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password")}
                error={errors.password && true}
                helperText={errors.password?.message}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/auth/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
