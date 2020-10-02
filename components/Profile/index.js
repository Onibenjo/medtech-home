import React, { useRef, useEffect, useState } from "react"
import { useSnackbar } from "notistack"
// import axios from "axios"
import * as firebase from "firebase/app"
import "firebase/storage"
import { makeStyles } from "@material-ui/core/styles"
import ListItemText from "@material-ui/core/ListItemText"
import CardActions from "@material-ui/core/CardActions"
import CardHeader from "@material-ui/core/CardHeader"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import Avatar from "@material-ui/core/Avatar"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import { MdPhotoCamera } from "react-icons/md"
import { auth } from "utils/lib/firebase"
import { useDocument } from "hooks/useDocument"
import { firebaseUploader } from "hooks/useFileUploader"
import { useAuth } from "utils/use-auth"
import DateFnsUtils from "@date-io/date-fns" // choose your lib
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import { format } from "date-fns"
import ChangePassword from "./personal/ChangePassword"
import CustomInput from "../CustomInput/CustomInput"
import GridItem from "../Grid/GridItem"
import GridContainer from "../Grid/GridContainer"
import Button from "../CustomButtons/Button"

const useStyles = makeStyles((theme) => {
  return {
    image: {
      display: "flex",
      justifyContent: "center",
      margin: theme.spacing(1),
      alignItems: "flex-end",
    },
    large: {
      width: theme.spacing(25),
      height: theme.spacing(25),
      // width: "106px",
      // height: "106px",
    },
    upload: {
      fontSize: 38,
    },
    uploadCon: {
      marginLeft: `-${theme.spacing(4)}px`,
      zIndex: "2",
      backgroundColor: "rgba(255,255,255,0.8)",
      padding: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      cursor: "pointer",
    },
  }
})

// const initialDetails = {
//   firstName: "",
//   lastName: "",
//   phoneNumber: "",
// }

const Profile = () => {
  const { user, setUser } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [openPass, setOpenPass] = useState(false)
  const imageRef = useRef()
  const { data, update: updatePrivate } = useDocument(
    `patients/${user.uid}/private/details`
  )
  const { update } = useDocument(`patients/${user.uid}`, { skip: true })
  const [details, setDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    state: user.state,
    dob: data.dob || new Date(),
  })

  const { phoneNumber, dob } = data
  // const dob = format(dobs, "dd/MM/YYYY")
  // format(details.dob, "dd/MM/yyyy")
  const classes = useStyles()
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleUpdate = async () => {
    const dob = format(details.dob, "dd/MM/yyyy")
    if (
      details.firstName !== "" &&
      details.lastName !== "" &&
      details.phoneNumber !== "" &&
      details.state !== "" &&
      details.dob !== ""
    ) {
      // const patient = db.collection("patients").doc(user.uid)
      await update({
        firstName: details.firstName,
        lastName: details.lastName,
        state: details.state,
      })
      // .then(() => {
      // patient.collection("private").doc("details").update({
      if (
        (details.phoneNumber !== data.phoneNumber,
        details.state !== data.state,
        details.dob !== data.dob)
      )
        await updatePrivate({
          phoneNumber: details.phoneNumber,
          state: details.state,
          dob,
        })
      setOpen(false)
      // })
    } else {
      setError("All fields must be filled")
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClosePass = () => {
    setOpenPass(false)
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setDetails((s) => ({ ...s, [name]: value }))
  }
  const setAutoComplete = (name, value) => {
    setDetails((s) => ({ ...s, [name]: value }))
  }
  const checkMimeType = (file) => {
    // list allow mime type
    const types = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
    ]
    // loop access array

    // compare file type find doesn't matach
    if (types.every((type) => file.type !== type)) {
      // create error message and assign to container
      setError(`${file.type.split("/")[1]} is not a supported format`)
      return false
    }
    return true
  }
  const checkFileSize = (file) => {
    const size = 2 * 1024 * 1024

    if (file.size > size) {
      setError(`File must be less than 2mb`)
      return false
    }

    return true
  }
  const handleImageChange = async (e) => {
    try {
      const image = e.target.files[0]
      setUploading(true)
      if (image && checkMimeType(image) && checkFileSize(image)) {
        // const formData = new FormData()
        // formData.append("image", image)
        // formData.append("image", image, image.name)
        // const token = await auth.currentUser.getIdToken()
        // const url =
        //   process.env.NEXT_PUBLIC_API_URL ||
        //   "http://localhost:5001/medtech-f46d7/europe-west1/api"
        // const res = await fetch(`${url}/user/image/patient`, {
        //   body: formData,
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     // "Content-Type": "multipart/form-data",
        //   },
        // })
        // const { data: resp } = await axios({
        //   method: "post",
        //   url: `${url}/user/image/patient`,
        //   data: formData,
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer ${token}`,
        //   },
        // })
        // const { imageUrl, message, thumbnail } = await res.json()
        const { url: imageUrl, thumb: thumbnail } = await firebaseUploader({
          file: image,
          name: user.lastName,
        })
        let thumb
        setTimeout(async () => {
          thumb = await firebase.storage().ref(thumbnail).getDownloadURL()
          await update({ imageUrl, thumbnail: thumb })
          await auth.currentUser.updateProfile({ photoURL: thumb })
          setUser({ thumbnail: thumb, photoURL: thumb })
        }, 8000)

        enqueueSnackbar("Uploaded", {
          variant: "success",
        })
        // updateUser()
        setUser({ imageUrl, thumbnail: imageUrl, photoURL: imageUrl })

        // do the fetchng here
      }
    } catch (err) {
      console.log(err)

      setError("There was an error")
    } finally {
      setUploading(false)
      // setError("")
    }
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      })
      setError("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])
  return (
    <div>
      <div className={classes.image}>
        <Avatar
          alt={user.displayName}
          src={user.imageUrl || ""}
          className={classes.large}
          style={{ opacity: uploading ? 0.3 : 1 }}
        />
        <label htmlFor="icon-button-file">
          <input
            type="file"
            hidden="hidden"
            accept="image/*"
            ref={imageRef}
            id="icon-button-file"
            onChange={handleImageChange}
          />
          <div className={classes.uploadCon}>
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
              // onClick={() => imageRef.current.click()}
            >
              <MdPhotoCamera className={classes.upload} />
            </IconButton>
          </div>
        </label>
      </div>
      <GridContainer>
        <GridItem md={2} sm={1} />
        <GridItem md={8} sm={10} xs={12}>
          <CardHeader title="Personal Details" />
          <div>
            <List className={classes.root}>
              <Divider variant="fullWidth" component="li" />
              <ListItem>
                <ListItemText
                  primary="Full Name"
                  secondary={`${user.firstName} ${user.lastName}`}
                />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem>
                <ListItemText primary="E-mail" secondary={user.email} />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem>
                <ListItemText primary="Phone Number" secondary={phoneNumber} />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem>
                <ListItemText primary="Date of Birth" secondary={dob} />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem>
                <ListItemText primary="State" secondary={user.state} />
              </ListItem>
            </List>
          </div>
          <CardActions>
            <Button
              simple
              color="primary"
              size="small"
              onClick={handleClickOpen}
            >
              Edit Info
            </Button>
            <Button
              simple
              color="primary"
              onClick={() => setOpenPass(true)}
              size="small"
            >
              Change password
            </Button>
          </CardActions>
          <ChangePassword open={openPass} handleClose={handleClosePass} />
        </GridItem>
        <GridItem md={2} sm={1} />
      </GridContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Your Profile</DialogTitle>
        <DialogContent>
          <CustomInput
            labelText="First Name"
            id="first"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "text",
              value: details.firstName,
              name: "firstName",
              onChange: handleChange,
            }}
          />
          <CustomInput
            labelText="Last Name"
            id="last"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "text",
              value: details.lastName,
              name: "lastName",
              onChange: handleChange,
            }}
          />
          <CustomInput
            labelText="Phone Number"
            id="number"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "text",
              value: details.phoneNumber,
              name: "phoneNumber",
              onChange: handleChange,
            }}
          />
          <CustomInput
            labelText="State"
            id="state"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "text",
              value: details.state,
              name: "state",
              onChange: handleChange,
            }}
          />
          {/* Date of brth */}

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={details.dob}
              maxDate={new Date()}
              format="do MMM yyyy"
              onChange={(date) => setAutoComplete("dob", date)}
              fullWidth
              invalidDateMessage=""
              margin="normal"
              id="dob"
              name="dob"
              label="Date of Birth"
              views={["year", "month", "date"]}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Profile
