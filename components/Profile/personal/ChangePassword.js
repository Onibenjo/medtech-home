import { useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import firebase from "firebase/app"
import { useSnackbar } from "notistack"
import Button from "../../CustomButtons/Button"
import CustomInput from "../../CustomInput/CustomInput"

const ChangePassword = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [updating, setUpdating] = useState(false)

  const handleUpdate = async () => {
    const user = firebase.auth().currentUser
    try {
      setUpdating(true)
      if (
        currentPassword &&
        newPassword &&
        confirmNewPassword &&
        newPassword === confirmNewPassword
      ) {
        const cred = await firebase.auth.EmailAuthProvider.credential(
          user.email,
          currentPassword
        )
        await user.reauthenticateWithCredential(cred)
        await user.updatePassword(newPassword)

        enqueueSnackbar("Password updated")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
        return
      }
      enqueueSnackbar("Password do not match", {
        variant: "error",
      })
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        enqueueSnackbar("Wrong password inputted", {
          variant: "error",
        })
        return
      }
      if (err.code === "auth/weak-password") {
        enqueueSnackbar("New password is weak.", {
          variant: "error",
        })
        return
      }
      enqueueSnackbar("An error occured while updating password", {
        variant: "error",
      })
    } finally {
      setUpdating(false)
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
      <DialogContent>
        <CustomInput
          labelText="Current Password"
          id="currentPassword"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "text",
            value: currentPassword,
            onChange: (e) => setCurrentPassword(e.target.value),
          }}
        />
        <CustomInput
          labelText="Enter New Password"
          id="newPassword"
          helperText="Password should be more than 5 characters long"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "text",
            value: newPassword,
            onChange: (e) => setNewPassword(e.target.value),
          }}
        />
        <CustomInput
          labelText="Confirm New Password"
          id="confirmNewPassword"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "text",
            value: confirmNewPassword,
            onChange: (e) => setConfirmNewPassword(e.target.value),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={updating}>
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" disabled={updating}>
          Change password
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangePassword
