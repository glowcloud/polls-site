import { FormGroup, FormControlLabel, Switch, Input } from "@mui/material";

const CommentsOption = ({ formState, setFormState }) => {
  return (
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
  );
};

export default CommentsOption;
