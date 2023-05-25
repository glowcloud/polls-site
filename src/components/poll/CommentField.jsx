import { TextField } from "@mui/material";

const CommentField = ({ formState, setFormState }) => {
  return (
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
  );
};

export default CommentField;
