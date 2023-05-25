import { Timestamp } from "firebase/firestore";
import { Box, FormGroup, FormControlLabel, Switch, Input } from "@mui/material";

const DateOption = ({ formState, setFormState }) => {
  return (
    <Box>
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
    </Box>
  );
};

export default DateOption;
