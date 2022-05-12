import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  getProducts,
} from "../features/products/productsSlice";
import Products from "../features/products/Products";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const ProductsList = () => {
  const allProducts = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography
        align="center"
        variant="h3"
        component="h3"
        sx={{
          fontWeight: "bold",
          fontFamily: "Quicksand",
          fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
          margin: "0.25em 0 0.75em 0",
        }}
      >
        Products
      </Typography>
      <Box>
        <Grid
          container
          columns={10}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          sx={{
            gap: "1.5em",
          }}
        >
          {allProducts.map((product) => (
            <Grid item sm={4} md={3} xl={2} key={product.product_id}>
              <Products product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductsList;
