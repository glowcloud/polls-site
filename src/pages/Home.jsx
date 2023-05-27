import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={{ xs: "75vh", sm: "85vh" }}
      px={{ xs: 2, sm: 10, md: 0 }}
    >
      <Typography
        variant="h2"
        gutterBottom
        pb={2}
        sx={{
          fontSize: { xs: "2.75rem", sm: "3.75rem" },
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
