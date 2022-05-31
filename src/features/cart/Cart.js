import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Cart = ({ product }) => {
  // Quantity selection state
  const [quantity, setQuantity] = useState(product.quantity);

  return (
    <Card raised sx={{ display: "flex", height: { xs: "140px", sm: "165px" } }}>
      <CardActionArea
        component={Link}
        to={`/product/${product.product_id}`}
        sx={{
          width: { xs: "126px", sm: "151px" },
          height: { xs: "140px", sm: "165px" },
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <CardMedia
          component="img"
          image={product.img_urls[0]}
          alt={product.name}
          title={product.name}
          sx={{
            width: { xs: "125px", sm: "150px" },
            height: { xs: "140px", sm: "165px" },
          }}
        />
      </CardActionArea>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0.5em",
          width: "100%",
        }}
      >
        <Box>
          <Typography
            gutterBottom
            variant="h5"
            component="h5"
            sx={{
              fontFamily: "Montserrat",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
              fontWeight: "bold",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontFamily: "Quicksand",
              fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" },
              color: "gray",
            }}
          >
            {product.color}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardActions sx={{ padding: 0 }}>
            <FormControl
              sx={{ marginTop: 1.5, minWidth: { xs: 75, sm: 100 } }}
              size="small"
            >
              <InputLabel id="quantity-label">Quantity</InputLabel>
              <Select
                value={quantity}
                labelId="quantity-label"
                id="quantity"
                label="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                required
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(
                  (number, index) => (
                    <MenuItem key={index} value={number}>
                      {number}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </CardActions>
          <Typography
            variant="h5"
            component="p"
            sx={{
              marginTop: "0.75em",
              fontWeight: "bold",
              fontFamily: "Quicksand",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
              alignSelf: "flex-end",
            }}
          >
            ${product.price}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Cart;
