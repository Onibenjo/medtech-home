import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useSnackbar } from "notistack"
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
import { MdCamera } from "react-icons/md"
import { db, auth } from "utils/lib/firebase"
import Typography from "@material-ui/core/Typography"
import { useDocument } from "hooks/useDocument"
import { firebaseUploader } from "hooks/useFileUploader"
import firebase from "firebase/app"
import ChangePassword from "./personal/ChangePassword"
import { useAuth } from "../../utils/use-auth"
import CustomInput from "../CustomInput/CustomInput"
import GridItem from "../Grid/GridItem"
import GridContainer from "../Grid/GridContainer"
import styles from "../../styles/PersonalDetailsStyle"
import Button from "../CustomButtons/Button"
import "firebase/storage"

const useStyles = makeStyles(styles)

const DoctorProfile = () => {
  const [open, setOpen] = useState(false)
  const [openPass, setOpenPass] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { user, setUser } = useAuth()
  const [errorValue, setErrorValue] = useState("")
  const classes = useStyles()
  const imageRef = useRef()
  const { data } = useDocument(`doctors/${user.uid}/private/details`)
  const { update } = useDocument(`patients/${user.uid}`, { skip: true })

  const {
    dob,
    gradSch,
    gradYear,
    license,
    service,
    phoneNumber,
    experience,
  } = data

  const [details, setDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: data.phoneNumber || "",
  })

  const handleClickOpen = () => {
    setOpen(true)
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
    if (!types.includes(file.type)) {
      // create error message and assign to container
      setErrorValue(`${file.type} is not a supported format`)
      return false
    }
    return true
  }
  const checkFileSize = (file) => {
    const size = 2 * 1024 * 1024

    if (file.size > size) {
      setErrorValue(`File should be less than 2MB`)
      return false
    }

    return true
  }
  const updateUser = () => {
    db.doc(`doctors/${user.uid}`)
      .get()
      .then((docData) => {
        if (!docData.exists) {
          // eslint-disable-next-line no-throw-literal
          throw "Document does not exist!"
        }
        setUser(docData.data())
      })
      .catch(() => setErrorValue("error fetching new details"))
  }
  const handleImageChange2 = async (e) => {
    try {
      const image = e.target.files[0]
      setUploading(true)
      setErrorValue("")
      if (image && checkMimeType(image) && checkFileSize(image)) {
        const formData = new FormData()
        formData.append("image", image, image.name)
        const token = await auth.currentUser.getIdToken()
        const url =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5001/medtech-f46d7/europe-west1/api"
        // const res = await fetch(`${url}/user/image/doctor`, {
        //   body: formData,
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer ${token}`,
        //   },
        // })
        const resp = await axios({
          method: "post",
          url: `${url}/user/image/doctor`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        // const resp = await res.json()
        enqueueSnackbar(resp.data.message, {
          variant: "success",
        })
        updateUser()

        // do the fetchng here
      }
    } catch (err) {
      setErrorValue("There was an error while uploading")
    } finally {
      setUploading(false)
      setErrorValue("")
    }
  }
  const handleImageChange = async (e) => {
    try {
      const image = e.target.files[0]
      setUploading(true)
      if (image && checkMimeType(image) && checkFileSize(image)) {
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

      setErrorValue("There was an error")
    } finally {
      setUploading(false)
      // setError("")
    }
  }
  const handleUpdate = async () => {
    if (
      details.firstName !== "" &&
      details.lastName !== "" &&
      details.phoneNumber !== ""
    ) {
      setErrorValue("")
      try {
        const doctorRef = db.collection("doctors").doc(user.uid)
        await doctorRef.update({
          firstName: details.firstName,
          lastName: details.lastName,
        })
        await auth.currentUser.updateProfile({
          displayName: `${details.firstName} ${details.lastName}`,
        })
        await doctorRef.collection("private").doc("details").update({
          phoneNumber: details.phoneNumber,
        })
        enqueueSnackbar("Profile update successful", {
          variant: "success",
        })
        updateUser()
        setOpen(false)
      } catch (error) {
        setErrorValue(error.message)
      }
    } else {
      setErrorValue("All fields must be filled")
    }
  }
  useEffect(() => {
    if (errorValue) {
      enqueueSnackbar(errorValue, {
        variant: "error",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorValue])
  return (
    <GridContainer>
      <GridItem md={2} sm={1} />
      <GridItem md={8} sm={10} xs={12}>
        <CardHeader title="Personal Details" />
        <div>
          <div
            className={classes.image}
            style={{ opacity: uploading ? 0.3 : 1 }}
          >
            <Avatar
              alt={user.name}
              src={user.imageUrl ? user.imageUrl : ""}
              className={classes.large}
            />
            <input
              type="file"
              hidden="hidden"
              ref={imageRef}
              onChange={handleImageChange}
            />
            <div className={classes.uploadCon}>
              <MdCamera
                className={classes.upload}
                onClick={() => imageRef.current.click()}
              />
            </div>
          </div>
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
              <ListItemText primary="Gender" secondary={user.gender} />
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
              <ListItemText primary="Specialty" secondary={user.specialty} />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
            <ListItem>
              <ListItemText
                primary="Graduation School & Year"
                secondary={`${gradSch}, ${gradYear}`}
              />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
            <ListItem>
              <ListItemText
                primary="Location"
                secondary={`${user.country}, ${user.city}`}
              />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
            <ListItem>
              <ListItemText primary="Medical License No." secondary={license} />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
            <ListItem>
              <ListItemText
                primary="Work Experience"
                secondary={user.experience || experience}
              />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
            <ListItem>
              <ListItemText primary="Service Type" secondary={service} />
            </ListItem>
          </List>
        </div>
        <CardActions>
          <Button simple onClick={handleClickOpen} color="primary" size="small">
            Edit Info
          </Button>
          {/* <Button simple onClick={() => setOpenPass(true)} color="primary" size="small">
            Change password
          </Button> */}
        </CardActions>
      </GridItem>
      <GridItem md={2} sm={1} />
      <ChangePassword open={openPass} handleClose={handleClosePass} />
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
          {errorValue && (
            <Typography
              component="p"
              style={{
                color:
                  errorValue === "All fields must be filled" ? "red" : "green",
              }}
              variant="body1"
            >
              {errorValue}
            </Typography>
          )}
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
    </GridContainer>
  )
}

export default DoctorProfile
