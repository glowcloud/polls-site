import { TextField } from "@mui/material";

const TitleField = ({ formState, setFormState, error }) => {
  return (
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
  );
};

export default TitleField;
