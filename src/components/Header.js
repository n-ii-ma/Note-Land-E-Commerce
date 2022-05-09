import Box from "@mui/material/Box";

const Header = () => {
  return (
    <Box>
      <img
        src="https://res.cloudinary.com/de3kst1ud/image/upload/v1652022389/Header/header_mobile_hmsq4f.jpg"
        alt="Galaxy Note 20 Ultra"
        className="mobileImage"
      />
      <h1 className="overlay-header">A Galaxy in the Palm of Your Hand</h1>
      <p className="overlay-p">
        Buy Your Favorite Samsung Galaxy Note on Note Land
      </p>
    </Box>
  );
};

export default Header;
