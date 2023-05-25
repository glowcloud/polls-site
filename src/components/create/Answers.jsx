import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
} from "@mui/material";
import { Cancel, Add } from "@mui/icons-material";

const Answers = ({ formState, setFormState, error }) => {
  return (
    <Box mt={2}>
      <Typography variant="body2">Answer Options:</Typography>

      {/* ANSWERS LIST */}
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

      {/* ADD ANSWER */}
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
    </Box>
  );
};

export default Answers;
