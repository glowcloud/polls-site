import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  FormGroup,
  Checkbox,
  Paper,
} from "@mui/material";

const MultiChoice = ({ poll, formState, setFormState, error }) => {
  return (
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
              sx={{
                wordBreak: "break-word",
              }}
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
            `Please choose 1 to ${
              poll.limit > 0 ? poll.limit : poll.answers.length
            } answers.`}
        </FormHelperText>
      </FormControl>
    </Paper>
  );
};

export default MultiChoice;
