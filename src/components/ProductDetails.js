import React from "react";
import { useState, useEffect } from "react";
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
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CropFreeIcon from "@mui/icons-material/CropFree";
import MemoryIcon from "@mui/icons-material/Memory";
import CameraIcon from "@mui/icons-material/Camera";
import BatteryCharging90Icon from "@mui/icons-material/BatteryCharging90";

const ProductDetails = () => {
  const [colorSelect, setColorSelect] = useState("");
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
              padding: "1em",
              backgroundColor: "#DACDCA",
            }}
          >
            <Grid container direction="row">
              {/* Image Carousel */}
              <Grid item xs={12} sm={6}>
                <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
                  {product.img_urls.map((image, index) => (
                    <CardMedia
                      component="img"
                      image={image}
                      title={product.name}
                      alt={product.name}
                      key={index}
                      sx={{
                        borderRadius: 1,
                        maxHeight: { xs: "auto", md: "400px" },
                      }}
                    />
                  ))}
                </Carousel>
              </Grid>
              {/* Product Specs */}
              <Grid
                item
                xs={12}
                order={{ xs: 3, md: 2 }}
                sx={{
                  display: { sm: "none", md: "flex" },
                  marginTop: { xs: "1em", md: "0" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    flexDirection: { xs: "row", md: "column" },
                    "& > :not(style)": {
                      margin: 0.5,
                      width: { xs: 140 },
                      height: 50,
                    },
                  }}
                >
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
                      <Typography>{product.specs.display[0].size}"</Typography>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {product.specs.display[0].resolution} px
                      </Typography>
                    </Box>
                  </Paper>
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
                      <Typography>{product.specs.hardware[0].ram}</Typography>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {product.specs.hardware[0].chipset}
                      </Typography>
                    </Box>
                  </Paper>
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
                      <Typography>{product.specs.camera[0].photo}</Typography>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {product.specs.camera[0].video}
                      </Typography>
                    </Box>
                  </Paper>
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
                      <Typography>{product.specs.battery}</Typography>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
              {/* Product Name and Price */}
              <Grid item xs={12} sm={6} order={{ xs: 2, md: 3 }}>
                <Box marginLeft="1em">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: { xs: "1.4rem", md: "1.5rem" },
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
                      fontSize: { xs: "1.4rem", md: "1.5rem" },
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
                      sx={{ fontFamily: "Roboto Flex", fontWeight: "400" }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
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
                        <Typography>
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
                        <Typography>{product.specs.hardware[0].ram}</Typography>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {product.specs.hardware[0].chipset}
                        </Typography>
                      </Box>
                    </Paper>
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
                        <Typography>{product.specs.camera[0].photo}</Typography>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {product.specs.camera[0].video}
                        </Typography>
                      </Box>
                    </Paper>
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
                        <Typography>{product.specs.battery}</Typography>
                      </Box>
                    </Paper>
                  </Box>
                  {/* Product Description for bigger than Mobile Screens */}
                  <Box>
                    <Typography
                      variant="body1"
                      component="p"
                      display={{ xs: "none", md: "block" }}
                    >
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
    </div>
  );
};

export default ProductDetails;
