import { useNavigate } from "react-router-dom";
import { Box, Divider, Button } from "@mui/material";

const BackButton = ({ id }) => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" my={2} onClick={() => navigate(`/polls/${id}`)}>
      <Divider sx={{ my: 5 }} />
      <Button variant="outlined">Back to poll</Button>
    </Box>
  );
};

export default BackButton;
