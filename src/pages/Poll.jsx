import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";

import { db } from "../data/firebase";
import Form from "../components/poll/Form";
import { useAuthContext } from "../hooks/useAuthContext";

const Poll = () => {
  const [poll, setPoll] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const getPoll = async () => {
      const pollSnap = await getDoc(doc(db, "polls", id));
      setPoll(pollSnap.data());
    };
    getPoll();
  }, [id]);

  return (
    <Box
      component={Paper}
      mx={{ xs: 2, sm: 5, md: 20, lg: 35, xl: 55 }}
      p={2}
      my={
        !poll ||
        (poll &&
          (poll.closed ||
            (poll.closeDate && poll.closeDate.toDate() - Date.now() < 0)))
          ? { xs: 15, sm: 23, md: 25, lg: 30, xl: 35 }
          : 3
      }
    >
      {/* NOT FOUND */}
      {!poll && (
        <Typography variant="h6" textAlign="center" color="red" py={1}>
          Poll not found
        </Typography>
      )}

      {/* TITLE */}
      {poll && (
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          px={2}
          py={1}
        >
          {poll.title}
        </Typography>
      )}

      {/* FORM */}
      {poll &&
        !poll.closed &&
        (!poll.closeDate ||
          (poll.closeDate && poll.closeDate.toDate() - Date.now() > 0)) && (
          <Form poll={poll} pollId={id} />
        )}

      {/* CLOSED */}
      {poll &&
        (poll.closed ||
          (poll.closeDate && poll.closeDate.toDate() - Date.now() < 0)) && (
          <Typography variant="h6" color="green" textAlign="center">
            Poll closed. Thank you for voting!
          </Typography>
        )}

      {/* RESULTS */}
      {poll &&
        (poll.results === "public" ||
          (poll.closed &&
            (poll.results === "vote" || poll.results === "closed")) ||
          ((poll.results === "private" || poll.results === "closed") &&
            user &&
            poll.userId === user.id)) && (
          <Box
            textAlign="center"
            mt={2}
            onClick={() => navigate(`/polls/${id}/results`)}
          >
            <Button variant="outlined" sx={{ my: 1 }}>
              See results
            </Button>
          </Box>
        )}
    </Box>
  );
};

export default Poll;
