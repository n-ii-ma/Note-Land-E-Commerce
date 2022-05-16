import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Carousel from "react-material-ui-carousel";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import CropFreeIcon from "@mui/icons-material/CropFree";
import MemoryIcon from "@mui/icons-material/Memory";
import CameraIcon from "@mui/icons-material/Camera";
import BatteryCharging90Icon from "@mui/icons-material/BatteryCharging90";

import {
  selectOneProduct,
  selectOneLoadingProduct,
  selectOneErrorProduct,
  getProduct,
} from "../features/products/productsSlice";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";

const ProductDetails = () => {
  // Color selection state
  const [colorSelect, setColorSelect] = useState("");

  const product = useSelector(selectOneProduct);
  const loadingProduct = useSelector(selectOneLoadingProduct);
  const errorProduct = useSelector(selectOneErrorProduct);
  const dispatch = useDispatch();

  // Get the product id from the url parameter
  const { product_id } = useParams();

  // Fetch product from the api
  useEffect(() => {
    dispatch(getProduct(product_id));
  }, [dispatch, product_id]);

  // Show skeleton if the product is loading or has error
  if (loadingProduct || errorProduct) return <ProductDetailsSkeleton />;

  return (
    <Box marginTop={{ xs: "6em", sm: "7em" }}>
      {typeof product.img_urls === "undefined" ? (
        ""
      ) : (
        <Container maxWidth="lg">
          <Card
            raised
            sx={{
              margin: "0 auto",
              padding: "1em",
              backgroundColor: "#DACDCA",
            }}
          >
            <Grid container direction="row">
              {/* Image Carousel */}
              <Grid item xs={12} sm={6} md={5}>
                <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
                  {product.img_urls.map((image, index) => (
                    <CardMedia
                      component="img"
                      image={image}
                      title={product.name}
                      alt={product.name}
                      key={index}
                      sx={{
                        borderRadius: 3,
                        maxHeight: { xs: "auto", md: "500px" },
                      }}
                    />
                  ))}
                </Carousel>
              </Grid>
              {/* Product Specs */}
              <Grid
                item
                xs={12}
                md={2}
                order={{ xs: 3, md: 2 }}
                sx={{
                  display: { sm: "none", md: "flex" },
                  marginTop: { xs: "1em", md: "0" },
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" },
                    flexWrap: "wrap",
                    flexDirection: { xs: "row", md: "column" },
                    "& > :not(style)": {
                      margin: { xs: 0.5, md: 1.5 },
                      width: { xs: 140, md: 130 },
                      height: 50,
                    },
                  }}
                >
                  <Tooltip title="Size & Resolution" enterTouchDelay={0}>
                    <Paper
                      elevation={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CropFreeIcon sx={{ margin: "0 4%" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justfiyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant="body1" component="p">
                          {product.specs.display[0].size}"
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {product.specs.display[0].resolution} px
                        </Typography>
                      </Box>
                    </Paper>
                  </Tooltip>
                  <Tooltip title="RAM & Chipset" enterTouchDelay={0}>
                    <Paper
                      elevation={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <MemoryIcon sx={{ margin: "0 4%" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justfiyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant="body1" component="p">
                          {product.specs.hardware[0].ram}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {product.specs.hardware[0].chipset}
                        </Typography>
                      </Box>
                    </Paper>
                  </Tooltip>
                  <Tooltip title="Photo & Video" enterTouchDelay={0}>
                    <Paper
                      elevation={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CameraIcon sx={{ margin: "0 4%" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justfiyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant="body1" component="p">
                          {product.specs.camera[0].photo}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {product.specs.camera[0].video}
                        </Typography>
                      </Box>
                    </Paper>
                  </Tooltip>
                  <Tooltip title="Battery" enterTouchDelay={0}>
                    <Paper
                      elevation={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <BatteryCharging90Icon sx={{ margin: "0 4%" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justfiyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant="body1" component="p">
                          {product.specs.battery}
                        </Typography>
                      </Box>
                    </Paper>
                  </Tooltip>
                </Box>
              </Grid>
              {/* Product Name and Price */}
              <Grid item xs={12} sm={6} md={5} order={{ xs: 2, md: 3 }}>
                <Box marginLeft={{ xs: "0", sm: "1em" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.75rem" },
                      marginTop: { xs: "0.5em", sm: 0 },
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="p"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                      fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.75rem" },
                      marginTop: { sm: ".5em" },
                    }}
                  >
                    ${product.price}
                  </Typography>
                  {/* Color Selection */}
                  <CardActions
                    sx={{ paddingLeft: 0, marginTop: { sm: "1em" } }}
                  >
                    <FormControl
                      sx={{ marginTop: 1, minWidth: 120 }}
                      size="small"
                    >
                      <InputLabel id="color-label">Color</InputLabel>
                      <Select
                        value={colorSelect}
                        labelId="color-label"
                        id="color"
                        label="Color"
                        onChange={(e) => setColorSelect(e.target.value)}
                        required
                      >
                        {product.specs.colors.map((color, index) => (
                          <MenuItem key={index} value={color}>
                            {color}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </CardActions>
                  {/* Add to Cart */}
                  <CardActions
                    sx={{ justifyContent: "flex-end", paddingRight: 0 }}
                  >
                    <Button
                      size="medium"
                      variant="contained"
                      color="success"
                      sx={{
                        fontFamily: "Roboto Flex",
                        fontWeight: "400",
                        fontSize: { md: "1rem" },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                  {/* Product Specs for 600px to 900px  */}
                  <Box
                    sx={{
                      display: { xs: "none", sm: "flex", md: "none" },
                      justifyContent: "center",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      marginTop: ".5em",
                      "& > :not(style)": {
                        margin: 0.5,
                        width: 120,
                        height: 50,
                      },
                    }}
                  >
                    <Tooltip title="Size & Resolution" enterTouchDelay={0}>
                      <Paper
                        elevation={1}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <CropFreeIcon sx={{ margin: "0 2%" }} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justfiyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography variant="body1" component="p">
                            {product.specs.display[0].size}"
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            component="p"
                            sx={{ fontSize: "0.75rem" }}
                          >
                            {product.specs.display[0].resolution} px
                          </Typography>
                        </Box>
                      </Paper>
                    </Tooltip>
                    <Tooltip title="RAM & Chipset" enterTouchDelay={0}>
                      <Paper
                        elevation={1}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MemoryIcon sx={{ margin: "0 2%" }} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justfiyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography variant="body1" component="p">
                            {product.specs.hardware[0].ram}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            component="p"
                            sx={{ fontSize: "0.75rem" }}
                          >
                            {product.specs.hardware[0].chipset}
                          </Typography>
                        </Box>
                      </Paper>
                    </Tooltip>
                    <Tooltip title="Photo & Video" enterTouchDelay={0}>
                      <Paper
                        elevation={1}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <CameraIcon sx={{ margin: "0 2%" }} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justfiyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography variant="body1" component="p">
                            {product.specs.camera[0].photo}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            component="p"
                            sx={{ fontSize: "0.75rem" }}
                          >
                            {product.specs.camera[0].video}
                          </Typography>
                        </Box>
                      </Paper>
                    </Tooltip>
                    <Tooltip title="Battery" enterTouchDelay={0}>
                      <Paper
                        elevation={1}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BatteryCharging90Icon sx={{ margin: "0 2%" }} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justfiyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography variant="body1" component="p">
                            {product.specs.battery}
                          </Typography>
                        </Box>
                      </Paper>
                    </Tooltip>
                  </Box>
                  {/* Product Description for bigger than Mobile Screens */}
                  <Box display={{ xs: "none", md: "block" }} marginTop="2em">
                    <Typography variant="body1" component="p">
                      {product.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              {/* Product Description for Mobile Screens */}
              <Grid
                item
                xs={12}
                sm={12}
                order={{ xs: 4 }}
                sx={{ display: { md: "none" }, marginTop: "1em" }}
              >
                <Box>
                  <Typography variant="body1" component="p">
                    {product.description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Container>
      )}
    </Box>
  );
};

export default ProductDetails;
