import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

const MultiOption = ({ formState, setFormState, error }) => {
  return (
    <Box>
      {/* CONTROL */}
      <FormGroup sx={{ mb: 1 }}>
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

      {/* LIMIT */}
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
    </Box>
  );
};

export default MultiOption;
