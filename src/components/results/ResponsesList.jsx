import { Box, Divider, Paper, Typography } from "@mui/material";

const ResponsesList = ({ poll, responses, smallScreen }) => {
  return (
    <Box mt={3}>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Responses
      </Typography>
      <Typography variant="h6" gutterBottom color="primary">
        Total responses: {responses.length}
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
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography
            width={poll.comments && !smallScreen ? "50%" : "100%"}
            sx={{ wordBreak: "break-all", px: 2 }}
          >
            {response.answers.join(", ")}
          </Typography>
          {poll.comments && !smallScreen && (
            <Divider orientation="vertical" flexItem />
          )}
          {poll.comments && smallScreen && <Divider flexItem sx={{ my: 2 }} />}
          {poll.comments && (
            <Typography
              width={{ xs: "100%", sm: "50%" }}
              sx={{ wordBreak: "break-word", px: 2 }}
            >
              {response.comment}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ResponsesList;
