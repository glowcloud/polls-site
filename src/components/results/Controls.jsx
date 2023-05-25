import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../data/firebase";
import { Box, IconButton } from "@mui/material";
import { Delete, CheckCircle } from "@mui/icons-material";

import ControlDialog from "./ControlDialog";

const Controls = ({ poll, id, setPoll }) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [closeDialog, setCloseDialog] = useState(false);
  const navigate = useNavigate();

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
    <Box textAlign="center" mb={2}>
      {/* DELETE */}
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

      <ControlDialog
        dialogOpen={deleteDialog}
        setDialogOpen={setDeleteDialog}
        handleConfirm={handleDelete}
        dialogTitle="Delete this poll?"
        dialogText="If you delete this poll, its content and results will be lost forever."
      />

      {/* CLOSE */}
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

      <ControlDialog
        dialogOpen={closeDialog}
        setDialogOpen={setCloseDialog}
        handleConfirm={handleClose}
        dialogTitle="Close this poll?"
        dialogText="If you close this poll, voting will not be possible to open again."
      />
    </Box>
  );
};

export default Controls;
