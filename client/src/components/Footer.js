import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          background: "linear-gradient(to bottom, #9C685B, #DACDCA)",
          textAlign: "center",
        }}
        marginTop="4em"
      >
        <Box padding="1em 0 0.25em 0">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontFamily: "Caveat",
              fontSize: { xs: "2.5rem", sm: "2.75rem", md: "3rem" },
            }}
          >
            Follow Us On
          </Typography>
          <IconButton
            aria-label="instagram"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon
              sx={{
                fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
                color: "black",
              }}
            />
          </IconButton>
          <IconButton
            aria-label="twitter"
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon
              sx={{
                fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
                color: "black",
              }}
            />
          </IconButton>
          <IconButton
            aria-label="facebook"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon
              sx={{
                fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
                color: "black",
              }}
            />
          </IconButton>
          <Typography variant="subtitle2" component="p" paddingTop="1em">
            &copy; {new Date().getFullYear()} Note Land Inc. All Rights Reserved
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
