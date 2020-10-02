import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import fetchApi from "utils/lib/fetchApi"
import { useSnackbar } from "notistack"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 1200,
    },
  },
}))

const initialValues = {
  name: "",
  email: "",
  company: "",
  proposal: "",
}

const PartnerWithUs = ({ handleClose, open }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [inputs, setInputs] = useState(initialValues)
  const handleChange = (e) => {
    setInputs({ [e.target.id]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputs.email && inputs.proposal && inputs.name) {
      fetchApi("/partner-with-us", {
        body: inputs,
      })
        .then(() => {
          enqueueSnackbar("Message sent successfully", {
            variant: "success",
          })
          setInputs(initialValues)
          handleClose()
        })
        .catch(() => {
          enqueueSnackbar("An error occured. Please try again!", {
            variant: "error",
          })
        })
    } else {
      enqueueSnackbar("All fields required", {
        variant: "error",
      })
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Partner With Us</h2>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Partner</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  value={inputs.name}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={inputs.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="company"
                  label="Company Name"
                  type="text"
                  fullWidth
                  value={inputs.company}
                  onChange={handleChange}
                />
                <TextField
                  id="proposal"
                  label="Proposal"
                  multiline
                  rows="5"
                  fullWidth
                  value={inputs.proposal}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit} color="primary" type="submit">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default PartnerWithUs
