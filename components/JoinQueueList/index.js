import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import React, { useEffect, useState } from "react"

import Button from "@material-ui/core/Button"
import DateFnsUtils from "@date-io/date-fns"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import { useSnackbar } from "notistack"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { useCollection } from "hooks/useCollection"
import { useRouter } from "next/router"
import { useAuth } from "../../utils/use-auth"

// import { db } from "utils/lib/firebase"

const useStyles = makeStyles(() => ({
  text: {
    width: "100%",
    marginTop: "20px",
  },
  marginTop: {
    marginTop: 18,
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  selectDoctorContainer: {
    alignItems: "center",
    marginTop: 8,
  },
}))
// export default function JoinQueueList({ id }) {
export default function JoinQueueList() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()
  const classes = useStyles()
  //   const [date] = useState(new Date().toISOString())
  const [selectedStartDate, setSelectedStartDate] = React.useState(
    new Date().toISOString()
  )
  const [disable, setDisable] = useState(true)
  const [selectedEndDate, setSelectedEndDate] = React.useState(
    new Date().toISOString()
  )
  const [state, setState] = useState({
    ailment: "",
  })
  const [cost, setCost] = useState(0)
  const [duration, setDuration] = useState(0)
  const [success, setSuccess] = useState(false)
  const [successValue, setSuccessValue] = useState("")

  const { add } = useCollection("queue", { skip: true })

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date)
    setDisable(false)
  }
  const handleEndDateChange = (date) => {
    setSuccessValue("")
    setSuccess(false)

    if (selectedStartDate.getTime() > date.getTime()) {
      setSuccessValue("End date should be more than Start date")
      enqueueSnackbar("End date should be more than Start date", {
        variant: "error",
      })
      setSelectedEndDate((prev) => prev)
      setSuccess(true)
    } else {
      setSelectedEndDate(date)
      const durationP = Math.round(
        (date.getTime() - selectedStartDate.getTime()) / 1000 / 60
      )
      const costP = durationP * 120
      setDuration(durationP)
      setCost(costP)
    }
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      state.ailment !== "" &&
      selectedStartDate !== "" &&
      selectedEndDate !== "" &&
      cost > 0
    ) {
    let join =  await add({
        patientId: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        ailment: state.ailment,
        duration,
        email: user.email,
        cost,
        location: `${user.country}, ${user.state}`,
        createdAt: new Date().toISOString(),
      })
      
      if(join) {
        enqueueSnackbar("You have successfully joined the queue", {
          variant: "success",
        })
        setCost(0)
        setState({ ...state, ailment: "" })
        router.push("/app")
      }
    } else {
      enqueueSnackbar("All fields must be filled", {
        variant: "error",
      })
    }
  }
  

  return (
    <Grid container justify="center">
      <Grid item md={3} sm={3} xs={12} />
      <Grid item md={6} sm={6} xs={12} style={{ marginTop: 24 }}>
        <Typography variant="h4" gutterBottom>
          Join the Queue
        </Typography>
        <Divider variant="fullWidth" component="div" />

        <TextField
          fullWidth
          placeholder="Enter Ailment e.g malaria"
          id="standard-basic"
          maxLength={15}
          variant="standard"
          onChange={(e) => handleChange(e)}
          name="ailment"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker1"
            label="Start"
            fullWidth
            value={selectedStartDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker2"
            label="End"
            fullWidth
            value={selectedEndDate}
            onChange={handleEndDateChange}
            disabled={disable}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>
        <Grid container className={classes.selectDoctorContainer}>
          <Grid item md={6} sm={6} xs={6}>
            <Typography variant="body1" component="p">
              Duration
            </Typography>
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <Typography
              variant="body1"
              component="p"
            >{`${duration} minutes`}</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.selectDoctorContainer}>
          <Grid item md={6} sm={6} xs={6}>
            <Typography variant="body1" component="p">
              Cost:
            </Typography>
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <Typography
              variant="body1"
              component="p"
            >{`N${cost} / $${Math.fround(cost / 388)
              .toString()
              .slice(0, 4)}`}</Typography>
          </Grid>
        </Grid>
        <div className={classes.button}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push("/app")}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            style={{ marginLeft: 16 }}
            color="primary"
            onClick={handleSubmit}
          >
            OK
          </Button>
        </div>
        {success && (
          <Typography
            component="p"
            style={{
              color:
                successValue === "You have successfully joined the queue"
                  ? "green"
                  : "red",
              marginTop: 16,
            }}
            variant="body1"
          >
            {successValue}
          </Typography>
        )}
      </Grid>
      <Grid item md={3} sm={3} xs={12} />
    </Grid>
  )
}
