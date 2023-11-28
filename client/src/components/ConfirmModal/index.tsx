import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  DialogContentText,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

interface Props {
  content: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export default function ConfirmModal(props: Props) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.task);

  return (
    <div>
      <Dialog
        open={props.open}
        classes={{ paper: "" }}
        onClose={props.onClose}
        style={{ padding: "3rem" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="">
            <Typography className="">Confirm Delete</Typography>
            <Box style={{ maxWidth: "50%", marginTop: "1rem" }}>
              <Typography className="">{props.content}</Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="">
          <Button
            onClick={() => props.onConfirm()}
            variant="contained"
            className=""
          >
            Delete
          </Button>
          {loading && (
            <Button variant="contained" className="">
              <CircularProgress size={30} color="inherit" className="" />
            </Button>
          )}
          <Button onClick={props.onClose} className="">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
