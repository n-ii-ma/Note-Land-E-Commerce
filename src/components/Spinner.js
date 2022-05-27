import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5em 0",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
