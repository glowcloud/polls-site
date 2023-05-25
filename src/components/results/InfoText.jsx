import { Box, Divider, Typography } from "@mui/material";

const InfoText = ({ text }) => {
  return (
    <Box>
      <Divider sx={{ mb: 4 }} />
      <Typography variant="h6" textAlign="center" color="red">
        {text}
      </Typography>
    </Box>
  );
};

export default InfoText;
