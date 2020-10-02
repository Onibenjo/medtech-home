import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import CustomizedSelects from "./drop"

export default function FormDialog({ handleClose, open }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Order Smart MOT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Order smart MOT, please enter your email address and quantity here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          <CustomizedSelects />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ padding: "4px", fontWeight: "300", fontSize: "16px" }}
          >
            Add Cart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
