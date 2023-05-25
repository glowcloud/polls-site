import { Box, Divider, Paper, Typography } from "@mui/material";

const ResponsesList = ({ poll, responses }) => {
  return (
    <Box mt={3}>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Responses
      </Typography>
      <Typography variant="h6" gutterBottom color="primary">
        Total votes: {responses.length}
      </Typography>
      {responses.map((response) => (
        <Box
          key={response.id}
          component={Paper}
          my={3}
          mx={2}
          py={3}
          px={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            width={poll.comments ? "50%" : "100%"}
            sx={{ wordBreak: "break-all", px: 2 }}
          >
            {response.answers.join(", ")}
          </Typography>
          {poll.comments && <Divider orientation="vertical" flexItem />}
          {poll.comments && (
            <Typography width="50%" sx={{ wordBreak: "break-word", px: 2 }}>
              {response.comment}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ResponsesList;
