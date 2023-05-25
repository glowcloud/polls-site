import { TextField } from "@mui/material";

const EmailField = ({
  formState,
  setFormState,
  error,
  submitError,
  isEmail,
  isLogin,
}) => {
  return (
    <TextField
      label="Email"
      sx={{ label: { color: "text.primary" }, my: 1 }}
      fullWidth
      required
      type="email"
      name="email"
      error={
        (error && (!formState.email || !isEmail(formState.email))) ||
        submitError
      }
      onChange={(e) =>
        setFormState((prevForm) => {
          return { ...prevForm, email: e.target.value };
        })
      }
      helperText={
        (error &&
          ((!formState.email && "Email field required.") ||
            (!isEmail(formState.email) && "Incorrect email."))) ||
        (isLogin && submitError && "Incorrect email or password.") ||
        (!isLogin && submitError && "Account with this email already exists.")
      }
      value={formState.email || ""}
    />
  );
};

export default EmailField;
