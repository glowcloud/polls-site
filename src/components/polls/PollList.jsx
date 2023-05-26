import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
} from "@mui/material";

const PollList = ({ polls }) => {
  const navigate = useNavigate();

  return (
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
                    (poll.closeDate && poll.closeDate.toDate() - Date.now() < 0)
                      ? "error.main"
                      : "primary.main",
                },
              }}
            >
              <ListItemText
                primary={poll.title}
                secondary={
                  poll.closed ||
                  (poll.closeDate && poll.closeDate.toDate() - Date.now() < 0)
                    ? "Closed"
                    : "Open"
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PollList;
