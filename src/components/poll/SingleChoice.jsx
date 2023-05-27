import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Paper,
} from "@mui/material";

const SingleChoice = ({ poll, setFormState, error }) => {
  return (
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
              sx={{
                wordBreak: "break-word",
              }}
              control={<Radio />}
              label={answer}
            />
          ))}
        </RadioGroup>
        <FormHelperText>{error && "Please choose one answer."}</FormHelperText>
      </FormControl>
    </Paper>
  );
};

export default SingleChoice;
