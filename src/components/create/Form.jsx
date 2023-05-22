import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import {
  Box,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  IconButton,
  Typography,
  RadioGroup,
  FormControl,
  Radio,
  Input,
  FormHelperText,
} from "@mui/material";
import { Cancel, Add } from "@mui/icons-material";
import { db } from "../../data/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";

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
    <Box
      component="form"
      autoComplete="off"
      py={3}
      px={{ xs: 2, sm: 5, md: 20, lg: 35, xl: 55 }}
    >
      {/* TITLE */}
      <TextField
        label="Title"
        sx={{ label: { color: "text.primary" }, my: 1 }}
        fullWidth
        required
        type="text"
        name="title"
        error={error && !formState.title}
        onChange={(e) =>
          setFormState((prevForm) => {
            return { ...prevForm, title: e.target.value };
          })
        }
        helperText={error && !formState.title && "Title required."}
        value={formState.title || ""}
      />

      {/* ANSWERS */}
      <Typography mt={1}>Answer Options:</Typography>
      <List>
        {formState.answers.map((answer, index) => (
          <ListItem
            key={index}
            secondaryAction={
              index > 0 && (
                <IconButton
                  edge="end"
                  onClick={() => {
                    setFormState((prevForm) => {
                      const prevAnswers = [...prevForm.answers];
                      prevAnswers.splice(index, 1);
                      return { ...prevForm, answers: prevAnswers };
                    });
                  }}
                >
                  <Cancel />
                </IconButton>
              )
            }
          >
            <TextField
              label={`Answer ${index}`}
              sx={{ label: { color: "text.primary" }, my: 1 }}
              fullWidth
              required
              type="text"
              name="answer"
              error={error && formState.answers[index] === ""}
              onChange={(e) =>
                setFormState((prevForm) => {
                  const prevAnswers = [...prevForm.answers];
                  prevAnswers[index] = e.target.value;
                  return {
                    ...prevForm,
                    answers: prevAnswers,
                  };
                })
              }
              helperText={
                error &&
                formState.answers[index] === "" &&
                "Empty answers are not allowed."
              }
              value={answer || ""}
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        startIcon={<Add />}
        sx={{ mb: 2, ml: 2 }}
        onClick={() => {
          setFormState((prevForm) => {
            const prevAnswers = prevForm.answers;
            prevAnswers.push("");
            return { ...prevForm, answers: prevAnswers };
          });
        }}
      >
        Add option
      </Button>

      {/* MULTIPLE ANSWERS */}
      <FormGroup sx={{ mt: 3, mb: 1 }}>
        <FormControlLabel
          label="Allow multiple answers"
          control={
            <Switch
              checked={formState.multi}
              onChange={() => {
                setFormState((prevState) => ({
                  ...prevState,
                  multi: !prevState.multi,
                }));
              }}
              name="multi"
            />
          }
        />
      </FormGroup>
      {formState.multi && (
        <TextField
          label="Answer choice limit (0 = none)"
          sx={{ label: { color: "text.primary" }, my: 2, ml: 2 }}
          required
          type="number"
          name="limit"
          error={
            error &&
            (formState.limit < 0 || formState.limit > formState.answers.length)
          }
          onChange={(e) =>
            setFormState((prevForm) => {
              return { ...prevForm, limit: e.target.value };
            })
          }
          helperText={
            error &&
            (formState.limit < 0 ||
              formState.limit > formState.answers.length) &&
            "Limit must be equal or more than 0 and lower or equal than the number of answers."
          }
          value={formState.limit || 0}
        />
      )}

      {/* CLOSE DATE */}
      <FormGroup sx={{ mb: 1 }}>
        <FormControlLabel
          label="Close poll on a scheduled date"
          control={
            <Switch
              checked={formState.hasDate}
              onChange={() => {
                setFormState((prevState) => ({
                  ...prevState,
                  hasDate: !prevState.hasDate,
                }));
              }}
              name="hasDate"
            />
          }
        />
      </FormGroup>
      {formState.hasDate && (
        <Input
          sx={{ ml: 2, px: 1, mt: 1, mb: 2 }}
          type="datetime-local"
          onChange={(e) =>
            setFormState((prevState) => {
              return {
                ...prevState,
                closeDate: Timestamp.fromDate(new Date(e.target.value)),
              };
            })
          }
        />
      )}

      {/* COMMENTS */}
      <FormGroup sx={{ mb: 1 }}>
        <FormControlLabel
          label="Allow comments"
          control={
            <Switch
              checked={formState.comments}
              onChange={() => {
                setFormState((prevState) => ({
                  ...prevState,
                  comments: !prevState.comments,
                }));
              }}
              name="comments"
            />
          }
        />
      </FormGroup>

      {/* VOTE VISIBILITY */}
      <Typography sx={{ mt: 3 }}>Results visibility</Typography>
      <FormControl required error={error} sx={{ pl: 2 }}>
        <RadioGroup
          onChange={(e) =>
            setFormState((prevState) => {
              return { ...prevState, results: e.target.value };
            })
          }
        >
          {["public", "vote", "closed", "private"].map((answer, index) => (
            <FormControlLabel
              key={index}
              value={answer}
              control={<Radio />}
              label={
                index === 0
                  ? "Public"
                  : index === 1
                  ? "After voting"
                  : index === 2
                  ? "After poll closes"
                  : "Private"
              }
            />
          ))}
        </RadioGroup>
        <FormHelperText>
          {error &&
            "Please choose one answer. Results can be private only for logged in users."}
        </FormHelperText>
      </FormControl>

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
