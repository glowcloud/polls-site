import { useState } from "react";
import { Box, Typography, Paper, Link } from "@mui/material";
import Form from "../components/login/Form";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        pb={2}
        px={2}
      >
        {isLogin ? "Log in to your account" : "Create an account"}
      </Typography>
      <Paper
        sx={{ mx: { xs: 2, sm: 20, md: 35, lg: 55, xl: 75 }, py: 3, px: 2 }}
      >
        {/* FORM */}
        <Form isLogin={isLogin} setIsLogin={setIsLogin} />

        {/* LOGIN/SIGNUP SWAP */}
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            component={Link}
            align="center"
            onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
            sx={{
              "&:hover": { cursor: "pointer" },
            }}
          >
            {isLogin
              ? "Click here to create an account"
              : "Already have an account?"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
