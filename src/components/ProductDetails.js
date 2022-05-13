import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectOneProduct,
  getProduct,
} from "../features/products/productsSlice";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Carousel from "react-material-ui-carousel";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const ProductDetails = () => {
  const product = useSelector(selectOneProduct);
  const dispatch = useDispatch();
  const { product_id } = useParams();

  useEffect(() => {
    dispatch(getProduct(product_id));
  }, [dispatch, product_id]);

  return (
    <div style={{ marginTop: "5em" }}>
      {typeof product.img_urls === "undefined" ? (
        ""
      ) : (
        <Container maxWidth="lg">
          <Card
            raised
            sx={{
              margin: "0 auto",
              padding: "0.5em",
              backgroundColor: "#DACDCA",
            }}
          >
            <Grid container direction="row">
              <Grid item xs={12} md={4} sx={{ border: "1px solid red" }}>
                <Carousel
                  autoPlay={false}
                  navButtonsAlwaysVisible={true}
                  sx={{
                    borderRadius: 1,
                  }}
                >
                  {product.img_urls.map((image, index) => (
                    <CardMedia
                      component="img"
                      image={image}
                      title={product.name}
                      alt={product.name}
                      key={index}
                    />
                  ))}
                </Carousel>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                order={{ xs: 3, md: 2 }}
                sx={{ border: "1px solid red" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    flexDirection: { xs: "row", md: "column" },
                    "& > :not(style)": {
                      margin: 1,
                      width: 128,
                      height: 50,
                    },
                  }}
                >
                  <Paper elevation={1} />
                  <Paper elevation={1} />
                  <Paper elevation={1} />
                  <Paper elevation={1} />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                order={{ xs: 2, md: 3 }}
                sx={{ border: "1px solid red" }}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: { xs: "1.4rem", md: "1.5rem" },
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                      fontSize: { xs: "1.4rem", md: "1.5rem" },
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default ProductDetails;
