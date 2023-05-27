import { Box, Paper, Typography } from "@mui/material";
import Form from "../components/create/Form";

const CreatePoll = () => {
  return (
    <Box my={2}>
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        pb={2}
      >
        Create a Poll
      </Typography>
      <Paper sx={{ mx: { xs: 2, sm: 5, md: 20, lg: 35, xl: 55 }, mt: 2 }}>
        <Form />
      </Paper>
    </Box>
  );
};

export default CreatePoll;
