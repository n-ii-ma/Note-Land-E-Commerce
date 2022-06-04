import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

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
      <CardActionArea component={Link} to={`/product/${product.product_id}`}>
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
          <Rating
            name="read-only-rating"
            defaultValue={5}
            readOnly
            sx={{ marginBottom: "0.5em" }}
          />
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
      </CardActionArea>
    </Card>
  );
};

export default Products;
