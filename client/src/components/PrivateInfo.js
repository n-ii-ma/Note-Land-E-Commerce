import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { updatePrivateSchema } from "../config/validationSchema";
import {
  getUser,
  updateUserPrivateInfo,
  clearUpdateState,
  selectOneUser,
  selectUpdateState,
} from "../features/users/usersSlice";

const PrivateInfo = () => {
  // User state
  const userInfo = useSelector(selectOneUser);
  const updateState = useSelector(selectUpdateState);

  const dispatch = useDispatch();

  // Refresh user after info update
  useEffect(() => {
    if (updateState) {
      dispatch(getUser(userInfo.user_id));
    }

    // Clear update state
    return () => dispatch(clearUpdateState());
  }, [dispatch, updateState, userInfo]);

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePrivateSchema),
    defaultValues: {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      password: null,
    },
  });

  // On submit
  const onSubmit = ({ first_name, last_name, email, password }) => {
    const user_id = userInfo.user_id;

    dispatch(
      updateUserPrivateInfo({ first_name, last_name, email, password, user_id })
    );
  };

  return (
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
            fullWidth
            id="first_name"
            label="First Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("last_name")}
            error={errors.last_name && true}
            helperText={errors.last_name?.message}
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("email")}
            error={errors.email && true}
            helperText={errors.email?.message}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("password")}
            error={errors.password && true}
            helperText={errors.password?.message}
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Edit Private Info
      </Button>
    </Box>
  );
};

export default PrivateInfo;
