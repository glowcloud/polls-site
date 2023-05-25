import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { Box, TextField, Button } from "@mui/material";

import { db } from "../../data/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import SingleChoice from "./SingleChoice";
import MultiChoice from "./MultiChoice";
import CommentField from "./CommentField";

const Form = ({ poll, pollId }) => {
  const [formState, setFormState] = useState({
    answers: [],
    comment: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const onSubmit = async () => {
    if (
      formState.answers.length < 1 ||
      (poll.limit && poll.limit > 0 && formState.answers.length > poll.limit) ||
      !pollId
    ) {
      setError(true);
    } else {
      try {
        await addDoc(collection(db, "responses"), { ...formState, pollId });
        setError(false);
        setFormState({ answers: [], comment: "" });
        if (
          poll.results === "public" ||
          poll.results === "vote" ||
          (poll.results === "private" && user && poll.userId === user.id)
        ) {
          navigate(`/polls/${pollId}/results`);
        } else {
          navigate("/polls");
        }
      } catch (err) {
        setError(true);
      }
    }
  };

  return (
    <Box component="form" autoComplete="off" py={2}>
      {/* SINGLE CHOICE */}
      {poll && poll.type === "single" && (
        <SingleChoice poll={poll} setFormState={setFormState} error={error} />
      )}

      {/* MULTI CHOICE */}
      {poll && poll.type === "multi" && (
        <MultiChoice
          poll={poll}
          formState={formState}
          setFormState={setFormState}
          error={error}
        />
      )}

      {/* COMMENT */}
      {poll && poll.comments && (
        <CommentField formState={formState} setFormState={setFormState} />
      )}

      {/* SUBMIT */}
      <Box textAlign="right">
        <Button
          onClick={onSubmit}
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Vote
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
