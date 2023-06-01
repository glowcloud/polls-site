import { Box, Divider, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";

import PieChart from "./PieChart";
import ResponsesList from "./ResponsesList";
import ResultsList from "./ResultsList";

const Responses = ({ poll, responses }) => {
  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
      {!smallScreen && <PieChart data={makeData()} smallScreen={smallScreen} />}

      {/* PERCENTAGES */}
      <ResultsList data={makeData()} responses={responses} />

      {/* RESPONSES LIST */}
      <ResponsesList
        poll={poll}
        responses={responses}
        smallScreen={smallScreen}
      />
    </Box>
  );
};

export default Responses;
