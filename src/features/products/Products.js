import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Products = ({ product }) => {
  return (
    <Card
      raised
      sx={{
        maxWidth: 300,
        margin: "0 auto",
        padding: "0.1em",
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={product.img_urls[0]}
        alt={product.name}
        sx={{ padding: "1em 1em 0 1em" }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h5"
          sx={{ fontFamily: "Montserrat" }}
        >
          {product.name}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="p"
          sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}
        >
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around" }}>
        <Button
          startIcon={<InfoOutlinedIcon />}
          size="small"
          variant="contained"
          color="info"
          sx={{ fontFamily: "Roboto Flex", fontWeight: "400" }}
        >
          Details
        </Button>
        <Button
          startIcon={<AddShoppingCartIcon />}
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
