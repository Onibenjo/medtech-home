import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { MdCancel } from "react-icons/md"
import Card from "./Card"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <MdCancel />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

export default function DoctorAppointMentDialog({
  handleClose,
  open,
  userDetails,
  loading,
}) {
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {!loading ? (
            <Card
              name={`${userDetails.firstName} ${userDetails.lastName}`}
              address={`${userDetails.state}, ${userDetails.country}`}
              img={userDetails.imageUrl}
              dob={userDetails.dob}
            />
          ) : (
            <div style={{ padding: 20 }}>loading...</div>
          )}
        </DialogTitle>
        <DialogContent
          dividers
          style={{
            display: "grid",
            gridTemplateColumns: "50% auto",
          }}
        />
      </Dialog>
    </div>
  )
}
