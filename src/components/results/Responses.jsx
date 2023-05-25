import { Box, Divider } from "@mui/material";

import PieChart from "./PieChart";
import ResponsesList from "./ResponsesList";

const Responses = ({ poll, responses }) => {
  const makeData = () => {
    const data = [];

    if (poll && responses.length > 0) {
      poll.answers.forEach((answer) => {
        let value = 0;

        responses.forEach((response) => {
          if (response.answers.includes(answer)) {
            value++;
          }
        });

        data.push({
          id: answer,
          value: value,
        });
      });
    }

    return data;
  };

  return (
    <Box textAlign="center" mt={3}>
      <Divider sx={{ mb: 3 }} />

      {/* PIE CHART */}
      <PieChart data={makeData()} />

      {/* RESPONSES LIST */}
      <ResponsesList poll={poll} responses={responses} />
    </Box>
  );
};

export default Responses;
