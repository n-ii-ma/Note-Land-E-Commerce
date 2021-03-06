import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import {
  selectAllProducts,
  selectAllLoadingProducts,
  selectAllErrorProducts,
  getProducts,
} from "../features/products/productsSlice";
import ProductsSkeleton from "./ProductsSkeleton";
import Products from "../features/products/Products";

const ProductsList = () => {
  // Products state
  const allProducts = useSelector(selectAllProducts);
  const loadingProducts = useSelector(selectAllLoadingProducts);
  const errorProducts = useSelector(selectAllErrorProducts);

  const dispatch = useDispatch();

  // Fetch products from the api on initial page load
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Show skeleton if the products are loading or have error
  if (loadingProducts || errorProducts) return <ProductsSkeleton />;

  return (
    <Container maxWidth="xl" id="products">
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
