import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Button from "../CustomButtons/Button"
import CardHeader from "../Card/CardHeader"
import Card from "../Card/Card"
import CardFooter from "../Card/CardFooter"
import GridItem from "../Grid/GridItem"
import GridContainer from "../Grid/GridContainer"

import styles from "../../styles/PatientNoteStyle"

const initialDetails = {
  patientName: "",
  doctorName: "",
  dob: "",
  patientNumber: "",
  gender: "other",
  specialist: "",
  treatment: "",
  complaint: "",
  recommendation: "",
  idCard: "",
  date: "",
}

export default function PatientNote() {
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const [details, setDetails] = useState(initialDetails)

  const handleOnChange = (e) => {
    e.persist()
    setDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setDetails((s) => ({ ...s, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const {
    patientName,
    doctorName,
    dob,
    patientNumber,
    gender,
    specialist,
    treatment,
    complaint,
    recommendation,
    date,
  } = details

  return (
    <div className={classes.container}>
      <GridContainer justify="center" className={classes.grid} align="center">
        <GridItem xs={12} sm={5} md={6} lg={8}>
          <Card>
            <CardHeader className={classes.cardHeader}>
              <h1>Patient Note</h1>
            </CardHeader>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="patientName"
                label="Patient Name"
                type="text"
                variant="outlined"
                value={patientName}
                onChange={(e) => handleOnChange(e)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                id="patientNumber"
                label="Patient NO"
                type="text"
                variant="outlined"
                value={patientNumber}
                onChange={(e) => handleOnChange(e)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="dob"
                label="Date of Birth"
                type="date"
                variant="outlined"
                value={dob}
                onChange={(e) => handleOnChange(e)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                fullWidth
                id="doctorName"
                label="Doctor Name"
                type="text"
                variant="outlined"
                value={doctorName}
                onChange={(e) => handleOnChange(e)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                id="specialist"
                label="Specialist"
                type="text"
                variant="outlined"
                value={specialist}
                onChange={(e) => handleOnChange(e)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                id="date"
                label="Date"
                type="date"
                variant="outlined"
                value={date}
                onChange={(e) => handleOnChange(e)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="complaint"
                label="Patient's complaint"
                value={complaint}
                variant="outlined"
                multiline
                className={classes.textField}
                rows={3}
                defaultValue=""
              />
              <TextField
                id="treatment"
                label="Treatment Details"
                variant="outlined"
                value={treatment}
                multiline
                className={classes.textField}
                rows={3}
                defaultValue=""
              />
              <TextField
                id="recommendation"
                label="Recommendation"
                variant="outlined"
                value={recommendation}
                multiline
                className={classes.textField}
                rows={3}
                defaultValue=""
              />
              <CardFooter>
                <Button
                  fullWidth
                  round
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Save as PDF
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
