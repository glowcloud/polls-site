import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Box, Typography, Button } from "@mui/material";
import { db } from "../data/firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import PollList from "../components/polls/PollList";

const Polls = () => {
  const [polls, setPolls] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const getPolls = async () => {
      const q = query(collection(db, "polls"), where("userId", "==", user.id));
      const pollsSnap = await getDocs(q);
      setPolls(pollsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    if (user) {
      getPolls();
    }
  }, [user]);

  return (
    <Box my={2} px={{ xs: 2, sm: 10, md: 15, lg: 20, xl: 45 }}>
      {polls && polls.length > 0 && (
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          pb={2}
        >
          Your polls
        </Typography>
      )}

      {polls && polls.length > 0 && <PollList polls={polls} />}

      {(!polls || polls.length === 0) && (
        <Box
          textAlign="center"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
          }}
          px={{ xs: 2, sm: 10, md: 0 }}
        >
          <Typography variant="h4" color="error" gutterBottom pb={2}>
            You have not created any polls yet
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/create")}>
            Create Poll
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Polls;
