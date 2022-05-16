import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import CropFreeIcon from "@mui/icons-material/CropFree";
import MemoryIcon from "@mui/icons-material/Memory";
import CameraIcon from "@mui/icons-material/Camera";
import BatteryCharging90Icon from "@mui/icons-material/BatteryCharging90";

const ProductDetailsSkeleton = () => {
  return (
    <Box marginTop={{ xs: "6em", sm: "7em" }}>
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
              <Skeleton
                variant="rectangular"
                sx={{ height: { xs: "300px", md: "500px" }, borderRadius: 3 }}
              />
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
                      <Skeleton variant="text" width={90} />
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      <Skeleton variant="text" width={90} />
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
                    <Typography variant="body1" component="p">
                      <Skeleton variant="text" width={90} />
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      <Skeleton variant="text" width={90} />
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
                    <Typography variant="body1" component="p">
                      <Skeleton variant="text" width={90} />
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      <Skeleton variant="text" width={90} />
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
                    <Typography variant="body1" component="p">
                      <Skeleton variant="text" width={90} />
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            {/* Product Name and Price */}
            <Grid item xs={12} sm={6} md={5} order={{ xs: 2, md: 3 }}>
              <Box marginLeft="1em">
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
                  <Skeleton variant="text" width="100%" />
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
                  <Skeleton variant="text" width="25%" />
                </Typography>
                {/* Color Selection */}
                <CardActions sx={{ paddingLeft: 0, marginTop: { sm: "1em" } }}>
                  <FormControl
                    sx={{ marginTop: 1, minWidth: 120 }}
                    size="small"
                  >
                    <Skeleton variant="rectangular" height={35} />
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
                        <Skeleton variant="text" width={80} />
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        <Skeleton variant="text" width={80} />
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
                        <Skeleton variant="text" width={80} />
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        <Skeleton variant="text" width={80} />
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
                        <Skeleton variant="text" width={80} />
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        <Skeleton variant="text" width={80} />
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
                        <Skeleton variant="text" width={80} />
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
                {/* Product Description for bigger than Mobile Screens */}
                <Box display={{ xs: "none", md: "block" }} marginTop="2em">
                  <Typography variant="body1" component="p">
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
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
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default ProductDetailsSkeleton;
