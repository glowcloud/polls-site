import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Polls from "./pages/Polls";
import Poll from "./pages/Poll";
import Results from "./pages/Results";
import CreatePoll from "./pages/CreatePoll";
import Login from "./pages/Login";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  const theme = createTheme({
    palette: {
      // type: "light",
      primary: {
        main: "#378b29",
      },
      secondary: {
        main: "#7c298b",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/polls" element={<Polls />} />
            <Route path="/polls/:id" element={<Poll />} />
            <Route path="/polls/:id/results" element={<Results />} />
            <Route path="/create" element={<CreatePoll />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/*" element={<Navigate to={"/"} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
