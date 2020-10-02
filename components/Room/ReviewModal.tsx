import React from "react"
import Dialog from "@material-ui/core/Dialog"
import Review from "components/Review"
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import { useRouter } from "next/router"
import { useAuth } from "utils/use-auth"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import Typography from "@material-ui/core/Typography"
import MuiDialogContent from "@material-ui/core/DialogContent"
import IconButton from "@material-ui/core/IconButton"
import { MdClose } from "react-icons/md"

const styles = (theme: Theme) =>
  createStyles({
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
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
          <MdClose />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const ReviewModal = ({ open, handleClose }) => {
  const router = useRouter()
  const { user } = useAuth()
  const doctorId =
    (router.query &&
      router.query.room &&
      router.query.room.toString().split("-")[1]) ||
    ""

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Rate and write a review about the session
      </DialogTitle>
      <DialogContent>
        <Review
          doctorId={doctorId}
          patientId={user.uid}
          patientImage={user.photoURL}
          patientName={user.displayName}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ReviewModal
