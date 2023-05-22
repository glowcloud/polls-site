import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Delete, CheckCircle } from "@mui/icons-material";

import { db } from "../data/firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import BarChart from "../components/results/BarChart";
import PieChart from "../components/results/PieChart";

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [responses, setResponses] = useState([]);
  const [poll, setPoll] = useState();
  const [layout, setLayout] = useState("vertical");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [closeDialog, setCloseDialog] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("0");

  useEffect(() => {
    if (poll && poll.closeDate && poll.closeDate.toDate() - Date.now() > 0) {
      const intervalID = setInterval(() => {
        setTimeRemaining(msToTime(poll.closeDate.toDate() - Date.now()));
      }, 100);

      return () => clearInterval(intervalID);
    }
  }, [poll]);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setLayout("horizontal");
    } else {
      setLayout("vertical");
    }
  }, [window.innerWidth]);

  useEffect(() => {
    const getPoll = async () => {
      const pollSnap = await getDoc(doc(db, "polls", id));
      setPoll(pollSnap.data());
    };
    const getResponses = async () => {
      const q = query(collection(db, "responses"), where("pollId", "==", id));
      const responsesSnap = await getDocs(q);
      setResponses(
        responsesSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getPoll();
    getResponses();
  }, [id]);

  const makeData = (responses, poll) => {
    const data = [];

    if (poll && responses.length > 0) {
      poll.answers.forEach((answer) => {
        let value = 0;

        responses.forEach((response) => {
          if (response.answers.includes(answer)) {
            value++;
          }
        });

        data.push({
          id: answer,
          value: value,
        });
      });
    }

    return data;
  };

  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor(duration / (24 * 60 * 60 * 1000));

    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return days + ":" + hours + ":" + minutes + ":" + seconds;
  }

  const handleDelete = async () => {
    await deleteDoc(doc(db, "polls", id));
    const q = query(collection(db, "responses"), where("pollId", "==", id));
    const responsesSnap = await getDocs(q);
    responsesSnap.forEach((response) => deleteDoc(response.ref));
    navigate("/polls");
  };

  const handleClose = async () => {
    const pollRef = doc(db, "polls", id);
    setPoll((prevPoll) => {
      return { ...prevPoll, closed: !poll.closed };
    });
    setCloseDialog(false);
    await updateDoc(pollRef, { closed: !poll.closed });
  };

  return (
    <Box py={5}>
      <Box textAlign="center" mb={2}>
        {/* TITLE */}
        <Typography variant="h4" gutterBottom mx={2}>
          {poll && poll.title}
        </Typography>
        {poll &&
        (poll.closed ||
          (poll.closeDate && poll.closeDate.toDate() - Date.now() < 0)) ? (
          <Typography variant="h6" gutterBottom mb={1} color="error">
            Poll closed
          </Typography>
        ) : (
          <Typography variant="h6" gutterBottom mb={1} color="primary">
            Poll open
          </Typography>
        )}
        {poll &&
          !poll.closed &&
          poll.closeDate &&
          poll.closeDate.toDate() - Date.now() > 0 && (
            <Typography gutterBottom mb={1}>
              Closes in {timeRemaining}
            </Typography>
          )}
        {poll && poll.userId && user && poll.userId === user.id && (
          <Box>
            <IconButton
              onClick={() => setDeleteDialog(true)}
              sx={{
                mx: 1,
                "&:hover": {
                  color: "error.main",
                },
              }}
            >
              <Delete />
            </IconButton>

            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
              <DialogTitle>Delete this poll?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  If you delete this poll, its content and results will be lost
                  forever.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteDialog(false)} autoFocus>
                  Cancel
                </Button>
                <Button onClick={handleDelete} sx={{ color: "red" }}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            <IconButton
              onClick={() => setCloseDialog(true)}
              disabled={
                poll.closed ||
                (poll.closeDate && poll.closeDate.toDate() - Date.now() < 0)
              }
              sx={{
                mx: 1,
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <CheckCircle />
            </IconButton>

            <Dialog open={closeDialog} onClose={() => setCloseDialog(false)}>
              <DialogTitle>Close this poll?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  If you close this poll, voting will not be possible to open
                  again.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setCloseDialog(false)} autoFocus>
                  Cancel
                </Button>
                <Button onClick={handleClose} sx={{ color: "red" }}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Box>

      {poll &&
        poll.results === "private" &&
        (!user || (user && poll.userId !== user.id)) && (
          <Typography variant="h6" textAlign="center" color="red">
            Results for this poll are private
          </Typography>
        )}

      {poll &&
        responses.length > 0 &&
        (poll.results !== "private" ||
          (poll.results === "private" && user && poll.userId === user.id)) && (
          <Box textAlign="center">
            {/* CHARTS */}
            <PieChart data={makeData(responses, poll)} layout={layout} />
            <BarChart data={makeData(responses, poll)} layout={layout} />

            {/* RESPONSES */}
            <Box mt={10} mx={2}>
              <Typography variant="h4" fontStyle="bold" gutterBottom>
                Responses
              </Typography>
              <Typography variant="h6" gutterBottom color="primary">
                Total votes: {responses.length}
              </Typography>
              {responses.map((response) => (
                <Box
                  key={response.id}
                  component={Paper}
                  my={3}
                  mx={{ xs: 0, sm: 5, md: 15, lg: 30, xl: 50 }}
                  py={3}
                  px={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography
                    width={poll.comments ? "50%" : "100%"}
                    sx={{ wordBreak: "break-all", px: 2 }}
                  >
                    {response.answers.join(", ")}
                  </Typography>
                  {poll.comments && <Divider orientation="vertical" flexItem />}
                  {poll.comments && (
                    <Typography
                      width="50%"
                      sx={{ wordBreak: "break-word", px: 2 }}
                    >
                      {response.comment}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}
    </Box>
  );
};

export default Results;
