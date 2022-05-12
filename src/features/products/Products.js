import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Products = ({ product }) => {
  return (
    <Card
      raised
      sx={{
        maxWidth: 280,
        margin: "0 auto",
        padding: "0.1em",
      }}
    >
      <CardMedia
        component="img"
        height="280"
        image={product.img_urls[0]}
        alt={product.name}
        title={product.name}
        sx={{ padding: "0.5em 0.5em 0 0.5em" }}
      />
      <CardContent>
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
  );
};

export default Products;
