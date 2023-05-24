import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { db } from "../data/firebase";
import { useAuthContext } from "../hooks/useAuthContext";

const Polls = () => {
  const [polls, setPolls] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const getPolls = async () => {
      const q = query(collection(db, "polls"), where("userId", "==", user.id));
      const pollsSnap = await getDocs(q);
      setPolls(pollsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    if (user) {
      getPolls();
    }
  }, []);

  return (
    <Box py={5} px={{ xs: 2, sm: 10, md: 15, lg: 20, xl: 45 }}>
      {polls && polls.length > 0 && (
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          pb={2}
        >
          Your polls
        </Typography>
      )}
      {polls && polls.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <List>
            {polls.map((poll, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => {
                    navigate(`/polls/${poll.id}`);
                  }}
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: 2,
                    ".MuiListItemText-secondary": {
                      color:
                        poll.closed ||
                        (poll.closeDate &&
                          poll.closeDate.toDate() - Date.now() < 0)
                          ? "error.main"
                          : "primary.main",
                    },
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#74d680",
                      ".MuiListItemText-secondary": {
                        color:
                          poll.closed ||
                          (poll.closeDate &&
                            poll.closeDate.toDate() - Date.now() < 0)
                            ? "error.main"
                            : "secondary.main",
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={poll.title}
                    secondary={
                      poll.closed ||
                      (poll.closeDate &&
                        poll.closeDate.toDate() - Date.now() < 0)
                        ? "Closed"
                        : "Open"
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {(!polls || polls.length === 0) && (
        <Box
          textAlign="center"
          py={{ xs: 30, xl: 35 }}
          px={{ xs: 2, sm: 10, md: 0 }}
        >
          <Typography variant="h4" color="error" gutterBottom pb={2}>
            You have not created any polls yet
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/create")}>
            Create Poll
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Polls;
