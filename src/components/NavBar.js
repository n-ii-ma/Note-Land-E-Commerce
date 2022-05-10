import { useState } from "react";
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
import { styled } from "@mui/material";

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
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [authenticated, setAuthenticated] = useState(false);
  // eslint-disable-next-line
  const [invisible, setInvisible] = useState(true);
  // eslint-disable-next-line
  const [badgeNumber, setBadgeNumber] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ background: "linear-gradient(to right, #9C685B, #DACDCA)" }}
      >
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: "none", xs: "flex" } }}
          >
            <Badge variant="dot" color="error" invisible={invisible}>
              <MenuIcon />
            </Badge>
          </IconButton>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              flexGrow: 1,
              fontFamily: "Caveat",
              fontSize: { xs: "1.75rem", sm: "2.5rem" },
            }}
          >
            Note Land
          </Typography>
          <NavButtons>
            <Button
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
            <Button
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
                  <MenuItem>Dashboard</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
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
    </Box>
  );
};

export default NavBar;
