import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Box, Button } from "@mui/material";

import { db } from "../../data/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

const Form = ({ isLogin }) => {
  const [formState, setFormState] = useState({
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
    if (!formState.email || !formState.password || !isEmail(formState.email)) {
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
          navigate("/polls");
        }
      } else {
        if (usersSnap.docs.length !== 0) {
          setSubmitError(true);
        } else {
          const userRef = await addDoc(collection(db, "users"), formState);
          const user = { ...formState, id: userRef.id };
          localStorage.setItem("pollUser", JSON.stringify(user));
          dispatch({ type: "LOGIN", payload: user });
          navigate("/polls");
        }
      }
    }
  };

  return (
    <Box component="form" autoComplete="off">
      {/* EMAIL */}
      <EmailField
        formState={formState}
        setFormState={setFormState}
        error={error}
        submitError={submitError}
        isEmail={isEmail}
        isLogin={isLogin}
      />

      {/* PASSWORD */}
      <PasswordField
        formState={formState}
        setFormState={setFormState}
        error={error}
        submitError={submitError}
        isLogin={isLogin}
      />

      {/* SUBMIT */}
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
