import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { selectCartProducts } from "../features/cart/cartSlice";
import Cart from "../features/cart/Cart";

const CartList = () => {
  // Cart state
  const cartProducts = useSelector(selectCartProducts);

  return (
    <Box marginTop={{ xs: "6em", sm: "7em" }}>
      <Container maxWidth="xl">
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
              justifyContent="center"
              alignItems="center"
              sx={{
                gap: "1em",
              }}
            >
              {cartProducts.map((product) => (
                <Grid item sm={12} md={8} key={product.product_id}>
                  <Cart product={product} />
                </Grid>
              ))}
            </Grid>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default CartList;
