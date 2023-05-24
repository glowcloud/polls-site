import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import {
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  FormGroup,
  Checkbox,
  Paper,
} from "@mui/material";

import { db } from "../../data/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";

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
      {/* RADIO */}
      {poll && poll.type === "single" && (
        <Paper sx={{ px: 2, py: 2 }}>
          <FormControl required error={error}>
            <RadioGroup
              onChange={(e) =>
                setFormState((prevState) => {
                  return { ...prevState, answers: [e.target.value] };
                })
              }
            >
              {poll.answers.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  value={answer}
                  control={<Radio />}
                  label={answer}
                />
              ))}
            </RadioGroup>
            <FormHelperText>
              {error && "Please choose one answer."}
            </FormHelperText>
          </FormControl>
        </Paper>
      )}

      {/* CHOICE */}
      {poll && poll.type === "multi" && (
        <Paper sx={{ px: 2, py: 2 }}>
          <FormControl
            required
            error={
              error || (poll.limit > 0 && formState.answers.length > poll.limit)
            }
          >
            {poll.limit > 0 && (
              <FormLabel>Pick up to {poll.limit} answers.</FormLabel>
            )}
            <FormGroup>
              {poll.answers.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  label={answer}
                  control={
                    <Checkbox
                      name={answer}
                      checked={formState.answers.includes(answer)}
                      onChange={(e) =>
                        setFormState((prevState) => {
                          let answers = prevState.answers;
                          if (answers.includes(e.target.name)) {
                            answers = answers.filter(
                              (answer) => answer !== e.target.name
                            );
                          } else {
                            answers.push(answer);
                          }
                          return {
                            ...prevState,
                            answers: answers,
                          };
                        })
                      }
                    />
                  }
                />
              ))}
            </FormGroup>
            <FormHelperText>
              {(error ||
                (poll.limit > 0 && formState.answers.length > poll.limit)) &&
                `Please choose 1 to ${poll.limit} answers.`}
            </FormHelperText>
          </FormControl>
        </Paper>
      )}

      {/* COMMENT */}
      {poll && poll.comments && (
        <TextField
          label="Comment"
          sx={{ label: { color: "text.primary" }, mt: 2 }}
          fullWidth
          type="text"
          multiline
          rows={5}
          name="comment"
          value={formState.comment || ""}
          onChange={(e) =>
            setFormState((prevForm) => {
              return { ...prevForm, comment: e.target.value };
            })
          }
        />
      )}

      {/* SUBMIT BUTTON */}
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
