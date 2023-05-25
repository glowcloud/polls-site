import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const Info = ({ poll }) => {
  const [timeRemaining, setTimeRemaining] = useState("0");

  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor(duration / (24 * 60 * 60 * 1000));

    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return days + ":" + hours + ":" + minutes + ":" + seconds;
  }

  useEffect(() => {
    if (poll && poll.closeDate && poll.closeDate.toDate() - Date.now() > 0) {
      const intervalID = setInterval(() => {
        setTimeRemaining(msToTime(poll.closeDate.toDate() - Date.now()));
      }, 100);

      return () => clearInterval(intervalID);
    }
  }, [poll]);

  return (
    <Box textAlign="center">
      {/* TITLE */}
      <Typography variant="h4" fontWeight="bold" gutterBottom mx={2}>
        {poll && poll.title}
      </Typography>

      {/* POLL STATUS */}
      {poll &&
      (poll.closed ||
        (poll.closeDate && poll.closeDate.toDate() - Date.now() < 0)) ? (
        <Typography variant="h6" gutterBottom mb={1} color="error">
          Poll closed
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom mb={1} color="primary">
          Poll open
        </Typography>
      )}

      {/* CLOSING TIME */}
      {poll &&
        !poll.closed &&
        poll.closeDate &&
        poll.closeDate.toDate() - Date.now() > 0 && (
          <Typography gutterBottom mb={1}>
            Closes in {timeRemaining}
          </Typography>
        )}
    </Box>
  );
};

export default Info;
