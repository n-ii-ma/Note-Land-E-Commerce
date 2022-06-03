import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Avatar from "@mui/material/Avatar";
import PaymentIcon from "@mui/icons-material/Payment";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";

import {
  checkout,
  selectCartProducts,
  selectCheckoutMessage,
} from "../features/cart/cartSlice";
import { selectUser } from "../features/users/usersSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // Message, loading and success states
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  // Users state
  const user = useSelector(selectUser);

  // Cart state
  const cartProducts = useSelector(selectCartProducts);
  const checkoutMessage = useSelector(selectCheckoutMessage);

  const dispatch = useDispatch();

  // Calculate total price
  const total = cartProducts
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  // Submit payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Disable form submission until Stripe.js has loaded
    if (!stripe || !elements) return;

    setIsLoading(true);

    // Confirm payment
    const { error } = await stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
    });

    // Set error message upon error
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setIsSuccessful(false);
      setMessage(error.message);
    } else if (!error) {
      // Checkout cart
      setIsSuccessful(true);
      setIsLoading(false);
      setMessage("Payment succeeded!");
      dispatch(checkout(user.user.cart_id));
    } else {
      setIsSuccessful(false);
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      {isSuccessful ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 2, bgcolor: "limegreen" }}>
            <CheckCircleIcon />
          </Avatar>
          <Typography
            gutterBottom
            variant="h5"
            component="h5"
            sx={{ fontFamily: "Montserrat", fontSize: "2rem" }}
          >
            Thank You!
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            sx={{ fontSize: "1.1rem" }}
          >
            Order Submitted Successfully
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontWeight: "bold",
              fontFamily: "quicksand",
              marginBottom: "1em",
              fontSize: "1.1rem",
            }}
          >
            Order Number: {checkoutMessage.order?.order_number}
          </Typography>
          <Button LinkComponent={Link} to="/" variant="contained">
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
            <PaymentIcon />
          </Avatar>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="p"
            sx={{ alignSelf: "flex-start" }}
          >
            Sample: 4242 4242 4242 4242 | 04/42 | 424
          </Typography>
          <PaymentElement />
          <LoadingButton
            variant="contained"
            type="submit"
            disabled={isLoading || !stripe || !elements}
            loading={isLoading}
            fullWidth
            sx={{ marginTop: "1.5em" }}
          >
            Pay ${total}
          </LoadingButton>
          {/* Show any error or success messages */}
          {message && (
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "tomato", paddingTop: "0.75em" }}
            >
              {message}
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default CheckoutForm;
