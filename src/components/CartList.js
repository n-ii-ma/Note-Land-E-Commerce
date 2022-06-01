import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { selectCartProducts } from "../features/cart/cartSlice";
import Cart from "../features/cart/Cart";
import CartSummary from "./CartSummary";

const CartList = () => {
  // Cart state
  const cartProducts = useSelector(selectCartProducts);

  return (
    <Box marginTop={{ xs: "6em", sm: "7em" }}>
      <Container maxWidth="lg">
        {!cartProducts?.length ? (
          <Typography
            align="center"
            variant="h3"
            component="h3"
            sx={{
              fontWeight: "bold",
              fontFamily: "Quicksand",
              fontSize: { xs: "1.75rem", md: "2rem" },
              margin: "0.25em 0 0.75em 0",
            }}
          >
            Cart Is Empty
          </Typography>
        ) : (
          <Card
            raised
            sx={{
              margin: "0 auto",
              padding: "1em",
              backgroundColor: "#DACDCA",
            }}
          >
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-evenly"
              sx={{
                gap: "2em",
              }}
            >
              <Grid
                container
                item
                xs={12}
                md={7}
                sx={{ width: "100%", gap: "1em" }}
              >
                {cartProducts.map((product) => (
                  <Grid item key={product.product_id} sx={{ width: "100%" }}>
                    <Cart product={product} />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} md={4} sx={{ width: "100%" }}>
                <CartSummary />
              </Grid>
            </Grid>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default CartList;
