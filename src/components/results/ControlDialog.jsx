import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ControlDialog = ({
  dialogOpen,
  setDialogOpen,
  handleConfirm,
  dialogTitle,
  dialogText,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleConfirm} sx={{ color: "red" }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ControlDialog;
