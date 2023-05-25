import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      textAlign="center"
      py={{ xs: 28, lg: 33, xl: 40 }}
      px={{ xs: 2, sm: 10, md: 0 }}
    >
      <Typography
        variant="h2"
        gutterBottom
        pb={2}
        sx={{
          fontWeight: "bold",
          color: "#378b29",
          backgroundImage: "linear-gradient(315deg, #378b29 0%, #74d680 74%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        Welcome to Easy Polls
      </Typography>
      <Button variant="outlined" onClick={() => navigate("/create")}>
        Create Poll
      </Button>
    </Box>
  );
};

export default Home;
