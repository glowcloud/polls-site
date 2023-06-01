import { Box, Divider, LinearProgress, Typography } from "@mui/material";

const ResultsList = ({ data, responses }) => {
  const sortedData = data.sort((a, b) => b.value - a.value);

  const getVoteCount = () => {
    let voteCount = 0;

    responses.forEach((response) => {
      voteCount += response.answers.length;
    });

    return voteCount;
  };

  const voteCount = getVoteCount();

  return (
    <Box mt={2} mx={{ xs: 0, sm: 2 }}>
      <Divider
        sx={{
          visibility: { xs: "hidden", sm: "visible" },
          mb: { xs: 0, sm: 3 },
        }}
      />
      {sortedData.map((item) => (
        <Box key={item.id} my={1}>
          <Box display="flex" justifyContent="space-between" mx={2}>
            <Typography sx={{ wordBreak: "break-word", pr: 2 }}>
              {item.id}
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }}>
              {((item.value / voteCount) * 100).toFixed(2)}% (
              {item.value === 1 ? `${item.value} vote` : `${item.value} votes`})
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(item.value / voteCount) * 100}
            sx={{
              mt: 1,
              mb: 3,
              mx: 2,
              height: 18,
              borderRadius: 2,
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ResultsList;
