import {
  Box,
  FormControlLabel,
  Typography,
  RadioGroup,
  FormControl,
  Radio,
  FormHelperText,
} from "@mui/material";

const ResultsOption = ({ formState, setFormState, error, user }) => {
  return (
    <Box>
      <Typography variant="body2" sx={{ mt: 3 }} gutterBottom>
        Results visibility
      </Typography>
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
            (!formState.results ||
              (!user && formState.results === "private")) &&
            "Please choose one answer. Results can be private only for logged in creators."}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default ResultsOption;
