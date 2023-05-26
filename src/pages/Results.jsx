import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

import { db } from "../data/firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import Info from "../components/results/Info";
import Controls from "../components/results/Controls";
import InfoText from "../components/results/InfoText";
import Responses from "../components/results/Responses";
import BackButton from "../components/results/BackButton";

const Results = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const [responses, setResponses] = useState([]);
  const [poll, setPoll] = useState();

  useEffect(() => {
    const getPoll = async () => {
      const pollSnap = await getDoc(doc(db, "polls", id));
      setPoll(pollSnap.data());
    };
    const getResponses = async () => {
      const q = query(collection(db, "responses"), where("pollId", "==", id));
      const responsesSnap = await getDocs(q);
      setResponses(
        responsesSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getPoll();
    getResponses();
  }, [id]);

  return (
    <Box
      component={Paper}
      my={3}
      py={3}
      mx={{ xs: 2, sm: 5, md: 20, lg: 35, xl: 55 }}
    >
      {!poll && (
        <Typography variant="h6" textAlign="center" color="red">
          Poll not found
        </Typography>
      )}

      {/* BASE INFO */}
      {poll && <Info poll={poll} />}

      {/* OWNER CONTROLS */}
      {poll && poll.userId && user && poll.userId === user.id && (
        <Controls poll={poll} id={id} setPoll={setPoll} />
      )}

      {/* PRIVATE RESULTS INFO */}
      {poll &&
        poll.results === "private" &&
        (!user || (user && poll.userId !== user.id)) && (
          <InfoText text="Results for this poll are private" />
        )}

      {/* NO VOTES INFO */}
      {poll &&
        responses.length === 0 &&
        (poll.results !== "private" ||
          (poll.results === "private" && user && poll.userId === user.id)) && (
          <InfoText text="No votes submitted" />
        )}

      {/* RESULTS */}
      {poll &&
        responses.length > 0 &&
        (poll.results !== "private" ||
          (poll.results === "private" && user && poll.userId === user.id)) && (
          <Responses poll={poll} responses={responses} />
        )}

      {/* BACK TO POLL */}
      {poll &&
        !poll.closed &&
        (!poll.closeDate || poll.closeDate.toDate() - Date.now() > 0) && (
          <BackButton id={id} />
        )}
    </Box>
  );
};

export default Results;
