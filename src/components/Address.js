import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { updateAddressSchema } from "../config/validationSchema";
import { updateUserAddress, selectOneUser } from "../features/users/usersSlice";

const Address = () => {
  // User state
  const userInfo = useSelector(selectOneUser);

  const dispatch = useDispatch();

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateAddressSchema),
    defaultValues: {
      address: userInfo.address,
      city: userInfo.city,
      postal_code: userInfo.postal_code,
      phone: userInfo.phone,
    },
  });

  // On submit
  const onSubmit = ({ address, city, postal_code, phone }) => {
    const id = userInfo.user_id;

    dispatch(updateUserAddress({ address, city, postal_code, phone, id }));
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
            {...register("address")}
            error={errors.address && true}
            helperText={errors.address?.message}
            autoComplete="street-address"
            name="address"
            fullWidth
            id="address"
            label="Address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("city")}
            error={errors.city && true}
            helperText={errors.city?.message}
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("postal_code")}
            error={errors.postal_code && true}
            helperText={errors.postal_code?.message}
            fullWidth
            id="postal_code"
            label="Postal Code"
            type="number"
            name="postal_code"
            autoComplete="postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("phone")}
            error={errors.phone && true}
            helperText={errors.phone?.message}
            fullWidth
            name="phone"
            label="Phone Number"
            type="number"
            id="phone"
            autoComplete="tel-national"
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Edit Address
      </Button>
    </Box>
  );
};

export default Address;
