import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { MdArrowBack, MdAdd, MdClose, MdMore } from "react-icons/md"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useSnackbar } from "notistack"
import Card from "@material-ui/core/Card"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
// firebase helper functions
import { useDocument } from "hooks/useDocument"
import { useCollection } from "hooks/useCollection"
import firebase from "firebase/app"
import { useAuth } from "utils/use-auth"
import styles from "styles/PatientViewStyles"
import Button from "../CustomButtons/Button"
import GridContainer from "../Grid/GridContainer"
import GridItem from "../Grid/GridItem"
import CustomInput from "../CustomInput/CustomInput"
import AddDrug from "../Recommendation/AddDrug"
import DiagnosisModal from "./DiagnosisModal"
import PrescriptionTable from "./PrescriptionTable"

const useStyles = makeStyles(styles)

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
          <MdClose />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const PatientView = ({ id }) => {
  const router = useRouter()
  const [drugName, setDrugName] = useState("")
  const [strength, setStrength] = useState("")
  const [recommendation, setRecommendation] = useState("")
  const [save, setSave] = useState(false)
  const [rsave, setRSave] = useState(false)
  const [openNote, setOpenNote] = useState(false)
  const [open, setOpen] = useState(false)
  const [disable, setDisable] = useState(false)
  const [docNote, setDocNote] = useState("")
  const [allergy, setAllergy] = useState("")
  const [saveValue] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [instructions, setinstructions] = useState("")
  const [addDiagnosis, setAddDiagnosis] = useState(false)
  const [disableDiag, setDisableDiag] = useState(false)
  const [disablePresc, setDisablePresc] = useState(false)
  const [prescribedDrugsList, setPrescribedDrugsList] = useState([])
  const [openDiagnosis, setOpenDiagnosis] = useState(false)
  const [selectedDiagnosis, setSelectedDiagnosis] = useState([])
  const { user } = useAuth()
  // start of db
  const {
    data: dataPrivate,
    update: updatePrivateDetails,
  } = useDocument(`patients/${id}/private/details`, { listen: true })
  const { data: userDetails } = useDocument(`patients/${id}`, { listen: true })
  const {
    data: patientNote,
    loading: noteloading,
    set: setNote,
  } = useDocument(`doctors/${user.uid}/notes/${id}`, { listen: true })
  const { add: addRecommendation } = useCollection(
    `patients/${id}/recommendations`,
    {
      skip: true,
    }
  )
  const {
    data: usedDrugs,
    add: addPrescription,
  } = useCollection(`patients/${id}/prescriptions`, { listen: true })
  // end of db
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (patientNote) setDocNote(patientNote.note)
  }, [id, patientNote])

  const onAddDrug = () => {
    setDisableDiag(true)
    if (!drugName) {
      enqueueSnackbar("Please input a Medicine name", {
        variant: "error",
      })
    } else {
      setPrescribedDrugsList((prev) => [
        ...prev,
        { drugName, strength, instructions },
      ])
      setDrugName("")
      setinstructions("")
      setStrength("")
      setOpen(false)
    }
  }
  const handleRemove = (name) => {
    setPrescribedDrugsList((prev) =>
      prev.filter((drug) => drug.drugName !== name)
    )
  }

  const handleSaveNote = async (e) => {
    e.preventDefault()
    setDisable(true)
    await setNote({ note: docNote }, { merge: true })
    enqueueSnackbar("Note saved", {
      variant: "success",
    })
    setDisable(false)
    setOpenNote(false)
  }

  const handleSaveRecommendation = async (e) => {
    e.preventDefault()
    setRSave(true)
    if (recommendation !== "") {
      await addRecommendation({
        recommendation,
        doctorName: `${user.firstName} ${user.lastName}`,
      })

      enqueueSnackbar("Your recommendation has been Sent", {
        variant: "success",
      })
      setRSave(false)
      setRecommendation("")
    } else {
      enqueueSnackbar("Recommendation field must be filled", {
        variant: "error",
      })
      setRSave(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (prescribedDrugsList.length !== 0) {
      setDisablePresc(true)
      await addPrescription({
        diagnosis,
        prescriptions: prescribedDrugsList,
        doctorId: user.uid,
        doctorName: `${user.firstName} ${user.lastName}`,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setPrescribedDrugsList([])
      setAddDiagnosis(false)
      setDisableDiag(false)
      setDiagnosis("")
      setDisablePresc(false)
      enqueueSnackbar("Prescription was successful", {
        variant: "success",
      })
    } else {
      enqueueSnackbar("At least a drug must be added", {
        variant: "error",
      })
    }
  }
  useEffect(() => {
    if (save) {
      setTimeout(() => {
        setSave(false)
      }, 4000)
    }
  }, [save])

  const handleAllergy = async (e) => {
    setAllergy("")
    e.preventDefault()
    if (allergy !== "") {
      await updatePrivateDetails({
        allergies: firebase.firestore.FieldValue.arrayUnion(allergy),
      })
      setAllergy("")
    }
  }

  return (
    <div>
      {!userDetails ? (
        <AiOutlineLoading3Quarters className={classes.rotate} />
      ) : (
        <div>
          <Button color="primary" size="sm" onClick={() => router.back()}>
            <MdArrowBack />
            My Patients
          </Button>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes.card}>
                {userDetails && userDetails.imageUrl ? (
                  <CardMedia
                    className={classes.media}
                    image={userDetails.imageUrl}
                    height="140"
                    title="patient"
                  />
                ) : null}
                <CardContent>
                  <Typography
                    component="h6"
                    className={classes.title}
                    variant="h6"
                  >
                    {userDetails.firstName
                      ? `${userDetails.firstName} ${userDetails.lastName}`
                      : null}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="textSecondary"
                  >
                    Gender
                    <span className={classes.value}>
                      {userDetails.gender ? userDetails.gender : null}
                    </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="textSecondary"
                  >
                    Date of Birth
                    <span className={classes.value}>
                      {dataPrivate.dob ? dataPrivate.dob : null}
                    </span>
                  </Typography>
                  {/* <Typography variant="body1" component="p" color="textSecondary">
                Height
                <span className={classes.value}>
                  {user.height ? user.height : null}
                </span>
              </Typography> */}
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.title}
                  >
                    Allergies
                  </Typography>
                  {dataPrivate.allergies
                    ? dataPrivate.allergies.map((algy, i) => (
                        <Typography component="p" variant="body1" key={i}>
                          {algy}
                          {/* <span className={classes.value}>{allergy.value}</span> */}
                        </Typography>
                      ))
                    : null}
                  <div className={classes.addbtn}>
                    <CustomInput
                      labelText="Allergies"
                      id="allergies"
                      formControlProps={{
                        fullWidth: true,
                        variant: "outlined",
                      }}
                      inputProps={{
                        value: allergy,
                        onChange: (e) => setAllergy(e.target.value),
                        type: "text",
                      }}
                    />
                    <Button onClick={handleAllergy} color="primary" size="sm">
                      Add
                      <MdAdd />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Button
                color="primary"
                fullWidth
                onClick={() => setOpenNote(true)}
                className={classes.card}
              >
                Note
              </Button>
              <Dialog
                open={openNote}
                fullWidth
                onClose={() => setOpenNote(false)}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle
                  id="form-dialog-title"
                  onClose={() => setOpenNote(false)}
                >
                  Note for {userDetails.firstName}
                  <span className={classes.visible}>
                    {" "}
                    (visible to you only)
                  </span>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText />
                  {noteloading ? (
                    <AiOutlineLoading3Quarters className={classes.rotate} />
                  ) : (
                    <TextareaAutosize
                      aria-label="minimum height"
                      value={docNote}
                      onChange={(e) => setDocNote(e.target.value)}
                      className={classes.textarea}
                      rowsMin={8}
                      placeholder=""
                    />
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleSaveNote}
                    color="primary"
                    disabled={disable}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.title}
                  >
                    PERSONAL DETAILS
                  </Typography>
                  <GridContainer>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={4}
                      xl={3}
                      className={classes.mb8}
                    >
                      <Typography
                        component="p"
                        variant="body1"
                        color="textSecondary"
                      >
                        Last name
                      </Typography>
                      <Typography component="p" variant="body1">
                        {userDetails.lastName ? userDetails.lastName : null}
                      </Typography>
                    </GridItem>

                    <GridItem
                      xs={12}
                      sm={12}
                      md={4}
                      xl={3}
                      className={classes.mb8}
                    >
                      <Typography
                        component="p"
                        variant="body1"
                        color="textSecondary"
                      >
                        First name
                      </Typography>
                      <Typography component="p" variant="body1">
                        {userDetails.firstName ? userDetails.firstName : null}
                      </Typography>
                    </GridItem>

                    <GridItem
                      xs={12}
                      sm={12}
                      md={4}
                      xl={3}
                      className={classes.mb8}
                    >
                      <Typography
                        component="p"
                        variant="body1"
                        color="textSecondary"
                      >
                        Birth Date
                      </Typography>
                      <Typography component="p" variant="body1">
                        {dataPrivate.dob ? dataPrivate.dob : null}
                      </Typography>
                    </GridItem>

                    <GridItem
                      xs={12}
                      sm={12}
                      md={4}
                      xl={3}
                      className={classes.mb8}
                    >
                      <Typography
                        component="p"
                        variant="body1"
                        color="textSecondary"
                      >
                        Email
                      </Typography>
                      <Typography component="p" variant="body1">
                        {userDetails.email ? userDetails.email : null}
                      </Typography>
                    </GridItem>
                    <GridItem md={2} />
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      xl={8}
                      className={classes.mb8}
                    >
                      <Typography
                        component="p"
                        variant="body1"
                        color="textSecondary"
                      >
                        Location
                      </Typography>
                      <Typography component="p" variant="body1">
                        {userDetails.country
                          ? `${userDetails.state}, ${userDetails.country}`
                          : null}
                      </Typography>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      xl={6}
                      className={classes.mb8}
                    >
                      <Typography
                        component="p"
                        variant="body1"
                        color="textSecondary"
                      >
                        Phone number
                      </Typography>
                      <Typography component="p" variant="body1">
                        {dataPrivate.phoneNumber
                          ? dataPrivate.phoneNumber
                          : null}
                      </Typography>
                    </GridItem>
                  </GridContainer>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.title}
                  >
                    PRESCRIPTIONS
                  </Typography>
                  <form>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6} className={classes.mb8}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => setAddDiagnosis(true)}
                        >
                          Add Diagnosis
                        </Button>
                      </GridItem>
                      {addDiagnosis && (
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          className={classes.mb8}
                        >
                          <GridItem
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.mb8}
                          >
                            <CustomInput
                              labelText="Diagnosis"
                              id="diagnosis"
                              formControlProps={{
                                fullWidth: true,
                                variant: "outlined",
                              }}
                              inputProps={{
                                value: diagnosis,
                                onChange: (e) => setDiagnosis(e.target.value),
                                type: "text",
                                disabled: disableDiag,
                              }}
                            />
                          </GridItem>

                          <GridItem
                            className={classes.addDrug}
                            xs={12}
                            sm={12}
                            md={6}
                          >
                            <AddDrug
                              drugName={drugName}
                              setDrugName={setDrugName}
                              strength={strength}
                              setStrength={setStrength}
                              instructions={instructions}
                              setinstructions={setinstructions}
                              onAddDrug={onAddDrug}
                              open={open}
                              setOpen={setOpen}
                              diagnosis={diagnosis}
                            />
                          </GridItem>
                          <GridItem
                            className={classes.addDrug}
                            xs={12}
                            sm={12}
                            md={12}
                          >
                            <PrescriptionTable>
                              {prescribedDrugsList.length > 0 &&
                                prescribedDrugsList.map((row) => (
                                  <TableRow key={row.drugName}>
                                    {/* <TableCell component="th" scope="row">
                                {row.diagnosis}
                              </TableCell> */}
                                    <TableCell align="right">
                                      {row.drugName}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.strength}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.instructions}
                                    </TableCell>
                                    <TableCell align="right">
                                      <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() =>
                                          handleRemove(row.drugName)
                                        }
                                        aria-label="close"
                                      >
                                        <MdClose />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </PrescriptionTable>
                          </GridItem>
                          <Button
                            autoFocus
                            color="inherit"
                            disabled={disablePresc}
                            type="submit"
                            onClick={(e) => handleSave(e)}
                          >
                            Prescribe
                          </Button>
                        </GridItem>
                      )}
                      <GridItem>
                        {save && (
                          <Typography
                            component="p"
                            style={{
                              color:
                                saveValue === "All fields must be filled"
                                  ? "red"
                                  : "green",
                            }}
                            variant="body1"
                          >
                            {saveValue}
                          </Typography>
                        )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <GridContainer align="center">
                          <GridItem xs={7} sm={7} md={8}>
                            <CustomInput
                              labelText="Recommendation"
                              id="recommendation"
                              formControlProps={{
                                fullWidth: true,
                                variant: "outlined",
                              }}
                              inputProps={{
                                value: recommendation,
                                onChange: (e) =>
                                  setRecommendation(e.target.value),
                                type: "text",
                              }}
                            />
                          </GridItem>
                          <GridItem
                            className={classes.addDrug}
                            xs={5}
                            sm={5}
                            md={4}
                          >
                            <Button
                              autoFocus
                              color="inherit"
                              disabled={rsave}
                              onClick={handleSaveRecommendation}
                              type="submit"
                            >
                              Send
                            </Button>
                          </GridItem>
                          <GridItem md={12} />
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardContent>
              </Card>
              <div className={classes.card}>
                <Typography
                  component="h6"
                  variant="h6"
                  className={classes.title}
                >
                  Previous Prescription
                </Typography>
                <TableCell component={Paper} className={classes.card}>
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Diagnosis</TableCell>
                        <TableCell align="right">Doctor Name</TableCell>
                        <TableCell align="right">Instruction</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usedDrugs
                        ? usedDrugs.map((row) => (
                            <TableRow key={row.createdAt}>
                              <TableCell component="th" scope="row">
                                {row.diagnosis}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.doctorName}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  edge="start"
                                  color="inherit"
                                  onClick={() => {
                                    setOpenDiagnosis(true)
                                    setSelectedDiagnosis(row.prescriptions)
                                  }}
                                  aria-label="close"
                                >
                                  <MdMore />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </TableCell>
                <DiagnosisModal
                  open={openDiagnosis}
                  setOpen={setOpenDiagnosis}
                  details={selectedDiagnosis}
                />
              </div>
            </GridItem>
          </GridContainer>
        </div>
      )}
    </div>
  )
}

export default PatientView
