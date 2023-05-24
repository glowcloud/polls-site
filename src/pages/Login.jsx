import { Box, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import Form from "../components/login/Form";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box my={{ xs: 15, xl: 20 }}>
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        pb={2}
      >
        {isLogin ? "Log in to your account" : "Create an account"}
      </Typography>
      <Paper
        sx={{ mx: { xs: 2, sm: 20, md: 35, lg: 55, xl: 75 }, py: 3, px: 2 }}
      >
        <Form isLogin={isLogin} setIsLogin={setIsLogin} />

        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            align="center"
            onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
            sx={{
              "&:hover": { textDecoration: "underline", cursor: "pointer" },
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
