import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import { selectCartProducts } from "../features/cart/cartSlice";

const CartSummary = () => {
  // Cart state
  const cartProducts = useSelector(selectCartProducts);

  // Total price state
  const [total, setTotal] = useState(0);

  // Calculate total price
  useEffect(() => {
    setTotal(
      cartProducts
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
  }, [cartProducts]);

  return (
    <Card
      raised
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h3"
          component="h3"
          sx={{
            fontFamily: "Montserrat",
            fontSize: { xs: "1.4rem", md: "1.5rem" },
            fontWeight: "bold",
            borderBottom: 1,
            borderColor: "divider",
            textAlign: "center",
            paddingBottom: "0.5em",
          }}
        >
          Summary
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            sx={{
              fontFamily: "Montserrat",
              fontSize: { xs: "1.2rem", md: "1.3rem" },
              fontWeight: "bold",
            }}
          >
            Subtotal
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            sx={{
              fontFamily: "Quicksand",
              fontSize: { xs: "1.2rem", md: "1.3rem" },
              fontWeight: "bold",
            }}
          >
            ${total}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          borderBottom={1}
          borderColor="divider"
        >
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            sx={{
              fontFamily: "Montserrat",
              fontSize: { xs: "1.2rem", md: "1.3rem" },
            }}
          >
            Shipping
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            sx={{
              fontFamily: "Quicksand",
              fontSize: { xs: "1.2rem", md: "1.3rem" },
            }}
          >
            Free
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" marginTop={2}>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontFamily: "Montserrat",
              fontSize: { xs: "1.3rem", md: "1.4rem" },
              fontWeight: "bold",
            }}
          >
            Total
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontFamily: "Quicksand",
              fontSize: { xs: "1.3rem", md: "1.4rem" },
              fontWeight: "bold",
            }}
          >
            ${total}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth color="success">
          Check Out
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartSummary;
