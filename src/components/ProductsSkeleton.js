import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";

const ProductsSkeleton = () => {
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
          {Array(10)
            .fill()
            .map((item, index) => (
              <Grid item sm={4} md={3} xl={2} key={index}>
                <Card
                  raised
                  sx={{
                    maxWidth: 280,
                    margin: "0 auto",
                    padding: "0.1em",
                  }}
                >
                  <Skeleton variant="rectangular" height={280} width={280} />
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: { xs: "1.4rem", md: "1.5rem" },
                      }}
                    >
                      <Skeleton variant="text" />
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h5"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: { xs: "1.4rem", md: "1.5rem" },
                      }}
                    >
                      <Skeleton variant="text" width="60%" />
                    </Typography>
                    <Skeleton>
                      <Rating
                        name="read-only-rating"
                        defaultValue={5}
                        readOnly
                        sx={{ marginBottom: "0.5em" }}
                      />
                    </Skeleton>
                    <Typography
                      variant="h5"
                      component="p"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "Quicksand",
                        fontSize: { xs: "1.4rem", md: "1.5rem" },
                      }}
                    >
                      <Skeleton variant="text" width="25%" />
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      sx={{ fontFamily: "Roboto Flex", fontWeight: "400" }}
                    >
                      Details
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      sx={{ fontFamily: "Roboto Flex", fontWeight: "400" }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductsSkeleton;
