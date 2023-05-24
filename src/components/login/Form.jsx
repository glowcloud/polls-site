import { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Box, Typography, TextField, Button } from "@mui/material";

import { db } from "../../data/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Form = ({ isLogin }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const isEmail = (email) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
  };

  const onSubmit = async () => {
    if (
      (!isLogin && !formState.name) ||
      !formState.email ||
      !formState.password ||
      !isEmail(formState.email)
    ) {
      setError(true);
    } else {
      const q = query(
        collection(db, "users"),
        where("email", "==", formState.email)
      );
      const usersSnap = await getDocs(q);

      if (isLogin) {
        if (
          usersSnap.docs.length === 0 ||
          usersSnap.docs[0].data().password !== formState.password
        ) {
          setSubmitError(true);
        } else {
          const user = {
            ...usersSnap.docs[0].data(),
            id: usersSnap.docs[0].id,
          };
          localStorage.setItem("pollUser", JSON.stringify(user));
          dispatch({ type: "LOGIN", payload: user });
          navigate("/");
        }
      } else {
        if (usersSnap.docs.length !== 0) {
          setSubmitError(true);
        } else {
          const userRef = await addDoc(collection(db, "users"), formState);
          const user = { ...formState, id: userRef.id };
          localStorage.setItem("pollUser", JSON.stringify(user));
          dispatch({ type: "LOGIN", payload: user });
          navigate("/");
        }
      }
    }
  };

  return (
    <Box component="form" autoComplete="off">
      {/* NAME */}
      {!isLogin && (
        <TextField
          label="Name"
          sx={{ label: { color: "text.primary" }, my: 1 }}
          fullWidth
          required
          type="text"
          name="name"
          error={error && !formState.name}
          onChange={(e) =>
            setFormState((prevForm) => {
              return { ...prevForm, name: e.target.value };
            })
          }
          helperText={error && !formState.name && "Name field required."}
          value={formState.name || ""}
        />
      )}

      {/* EMAIL */}
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

      {/* PASSWORD */}
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

      <Box textAlign="center">
        <Button
          onClick={onSubmit}
          variant="contained"
          size="large"
          sx={{ my: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
