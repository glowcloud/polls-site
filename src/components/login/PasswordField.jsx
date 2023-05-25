import { TextField } from "@mui/material";

const PasswordField = ({
  formState,
  setFormState,
  error,
  submitError,
  isLogin,
}) => {
  return (
    <TextField
      label="Password"
      sx={{ label: { color: "text.primary" }, my: 1 }}
      fullWidth
      required
      type="password"
      name="password"
      error={(error && !formState.password) || (isLogin && submitError)}
      onChange={(e) =>
        setFormState((prevForm) => {
          return { ...prevForm, password: e.target.value };
        })
      }
      helperText={
        (error && !formState.password && "Password required.") ||
        (isLogin && submitError && "Incorrect email or password.")
      }
      value={formState.password || ""}
    />
  );
};

export default PasswordField;
