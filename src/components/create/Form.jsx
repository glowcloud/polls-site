import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { Box, Button, Divider } from "@mui/material";
import { db } from "../../data/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import TitleField from "./TitleField";
import Answers from "./Answers";
import MultiOption from "./MultiOption";
import DateOption from "./DateOption";
import CommentsOption from "./CommentsOption";
import ResultsOption from "./ResultsOption";

const Form = () => {
  const [formState, setFormState] = useState({
    title: "",
    multi: false,
    limit: 0,
    answers: [""],
    comments: false,
    results: "",
    hasDate: false,
    closeDate: null,
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const onSubmit = async () => {
    if (
      !formState.title ||
      (!formState.answers.length > 0 && formState.includes("")) ||
      formState.limit < 0 ||
      formState.limit > formState.answers.length ||
      !formState.results ||
      (formState.results === "private" && !user)
    ) {
      setError(true);
    } else {
      const newPoll = {
        title: formState.title,
        type: formState.multi ? "multi" : "single",
        limit: Math.floor(formState.limit),
        answers: formState.answers,
        comments: formState.comments,
        results: formState.results,
        closeDate: formState.closeDate,
        closed: false,
        userId: user ? user.id : null,
      };
      const pollRef = await addDoc(collection(db, "polls"), newPoll);

      setError(false);
      setFormState({
        title: "",
        multi: false,
        limit: 0,
        answers: [""],
        comments: false,
        results: "",
        hasDate: false,
        closeDate: null,
      });
      navigate(`/polls/${pollRef.id}`);
    }
  };

  return (
    <Box component="form" autoComplete="off" py={3} px={{ xs: 3 }}>
      {/* TITLE */}
      <TitleField
        formState={formState}
        setFormState={setFormState}
        error={error}
      />

      {/* ANSWERS */}
      <Answers
        formState={formState}
        setFormState={setFormState}
        error={error}
      />

      <Divider sx={{ mt: 2, mb: 3 }} />

      {/* MULTIPLE ANSWERS */}
      <MultiOption
        formState={formState}
        setFormState={setFormState}
        error={error}
      />

      {/* CLOSE DATE */}
      <DateOption
        formState={formState}
        setFormState={setFormState}
        error={error}
      />

      {/* COMMENTS */}
      <CommentsOption formState={formState} setFormState={setFormState} />

      {/* VOTE VISIBILITY */}
      <ResultsOption
        formState={formState}
        setFormState={setFormState}
        error={error}
        user={user}
      />

      {/* SUBMIT */}
      <Box textAlign="right">
        <Button
          onClick={onSubmit}
          variant="contained"
          size="large"
          sx={{ my: 1 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
