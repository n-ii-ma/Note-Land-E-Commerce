import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import ButtonBase from "@mui/material/ButtonBase";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { styled } from "@mui/material";

import { logoutUser, selectLoggedInState } from "../features/users/usersSlice";
import { clearCart, selectCartQuantity } from "../features/cart/cartSlice";
import { persistor } from "../index";

const NavButtons = styled("div")(({ theme }) => ({
  width: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

const NavBar = () => {
  // Hamburger button state
  const [open, setOpen] = useState(false);

  // Authentication state
  const [authenticated, setAuthenticated] = useState(false);

  // Badge visibility state
  const [invisible, setInvisible] = useState(true);

  // Badge number state
  const [badgeNumber, setBadgeNumber] = useState(0);

  // Position of authentication menu state
  const [anchorEl, setAnchorEl] = useState(null);

  // Scroll to hide App bar
  const trigger = useScrollTrigger();

  // Users state
  const loggedInState = useSelector(selectLoggedInState);

  // Cart quantity state
  const cartQuantity = useSelector(selectCartQuantity);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Show account icon when user gets logged in
  useEffect(() => {
    if (loggedInState) {
      setAuthenticated(true);
      setAnchorEl(null);
    } else {
      setAuthenticated(false);
    }
  }, [loggedInState]);

  // Show badge when cart isn't empty
  useEffect(() => {
    if (cartQuantity > 0) {
      setInvisible(false);
    } else {
      setInvisible(true);
    }

    setBadgeNumber(cartQuantity);
  }, [cartQuantity]);

  // Log out user
  const handleLogOut = () => {
    // Navigate to the home page
    if (location.pathname === "/dashboard") {
      navigate("/", { replace: true });
    }

    // Logout user
    dispatch(logoutUser());

    // Clear cart
    dispatch(clearCart());

    // Purge redux-persist state 1 second after logout
    setTimeout(() => persistor.purge(), 1000);
  };

  // Set position of the menu to the current target of the event
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // Close the authentication menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Navigate to page section
  const onNavClick = (e, id) => {
    if (location.pathname === "/") {
      let element = document.getElementById(id);
      e.preventDefault();
      element.scrollIntoView();
    } else {
      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="fixed"
          sx={{ background: "linear-gradient(to right, #9C685B, #DACDCA)" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: "flex", sm: "none" }, zIndex: 1 }}
            >
              <Badge variant="dot" color="error" invisible={invisible}>
                <MenuIcon />
              </Badge>
            </IconButton>
            <ButtonBase
              component={Link}
              to="/"
              sx={{
                position: { xs: "absolute", sm: "static" },
                left: 0,
                right: 0,
                zIndex: 0,
              }}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  fontFamily: "Caveat",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                }}
              >
                Note Land
              </Typography>
            </ButtonBase>
            <NavButtons sx={{ zIndex: 1, marginRight: { xs: -1, sm: 0 } }}>
              <Button
                onClick={(e) => onNavClick(e, "products")}
                startIcon={<PhoneAndroidIcon />}
                sx={{
                  color: "black",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  fontSize: { sm: "1rem" },
                  display: { xs: "none", sm: "flex" },
                }}
              >
                Shop
              </Button>
              <Badge
                color="error"
                badgeContent={badgeNumber}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Button
                  component={Link}
                  to="/cart"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    color: "black",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: { sm: "1rem" },
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  Cart
                </Button>
              </Badge>
              {authenticated ? (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle sx={{ color: "black", fontSize: "1em" }} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component={Link}
                      to="/dashboard"
                      onClick={handleClose}
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  component={Link}
                  to="/auth/login"
                  color="inherit"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: "black",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: { sm: "1rem" },
                  }}
                >
                  Login
                </Button>
              )}
            </NavButtons>
          </Toolbar>
          <Drawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
              sx: {
                background: "linear-gradient(to top, #9C685B44, #9C685Bff)",
                zIndex: 1,
              },
            }}
          >
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon sx={{ color: "white" }} />
            </IconButton>
            <Divider />
            <List>
              <ListItem>
                <Button
                  onClick={(e) => onNavClick(e, "products")}
                  startIcon={<PhoneAndroidIcon />}
                  sx={{
                    color: "white",
                    fontFamily: "Montserrat",
                  }}
                >
                  Shop
                </Button>
              </ListItem>
              <ListItem>
                <Badge color="error" badgeContent={badgeNumber}>
                  <Button
                    component={Link}
                    to="/cart"
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      color: "white",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Cart
                  </Button>
                </Badge>
              </ListItem>
            </List>
          </Drawer>
        </AppBar>
      </Slide>
    </Box>
  );
};

export default NavBar;
