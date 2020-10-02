import React, { useState } from "react"
// import firebase from "firebase/app"
import { useRouter } from "next/router"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import Button from "@material-ui/core/Button"
import parseISO from "date-fns/parseISO"
import formatRelative from "date-fns/formatRelative"
// import { useDocumentSnap } from "hooks/useDocument"
import CardFooter from "components/Card/CardFooter"
import CardBody from "components/Card/CardBody"
import Card from "components/Card/Card"
import { useCollection } from "hooks/useCollection"
import { useSnackbar } from "notistack"
import { useDocument } from "hooks/useDocument"
import { useAuth } from "utils/use-auth"
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@material-ui/core"
import { MdArrowDropDown } from "react-icons/md"
import UpcomingAppointment from "./UpcomingAppointment"
import AppointmentHistoryContainer from "./AppointmentHistoryContainer"
// import JoinList from "../JoinQueueList/JoinList"

const useStyles = makeStyles((theme) => ({
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
  my: {
    margin: "16px 0",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const ScheduleAppointment = ({ id }) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 1000 * 60 * 20).toISOString()
  )
  const [reason, setReason] = useState("")

  const { add } = useCollection("appointments", {
    skip: true,
  })
  const { data: doctorName } = useDocument(`doctors/${id}`, {
    skip: !id,
  })
  const { data: previousAppointments } = useCollection("appointments", {
    where: [
      ["patient.id", "==", user.uid],
      ["status", "==", "completed"],
    ],
    limit: 5,
  })

  const { data: upcomingAppointments } = useCollection("appointments", {
    listen: true,
    where: [
      ["patient.id", "==", user.uid],
      ["status", "==", "accepted"],
    ],
  })

  const { data: overDueAppointments } = useCollection("appointments", {
    // listen: true,
    where: [
      ["patient.id", "==", user.uid],
      ["status", "==", "overdue"],
    ],
    orderBy: ["date", "desc"],
    limit: 5,
  })
  const parseDate = (date) => {
    return `${formatRelative(parseISO(date), new Date())}`
  }
  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      reason !== "" &&
      doctorName !== "" &&
      id !== null &&
      selectedDate !== ""
    ) {
      if (user.balance > 600) {
        await add({
          reason,
          doctor: {
            id,
            name: `${doctorName.firstName} ${doctorName.lastName}`,
            imageUrl:
              doctorName.imageUrl === undefined ? "" : doctorName.imageUrl,
            email: doctorName.email,
          },
          date: selectedDate,
          patient: {
            id: user.uid,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl === undefined ? "" : user.imageUrl,
            email: user.email,
          },
          status: "pending",
          createdAt: new Date().toISOString(),
        })
        enqueueSnackbar("Appointment was successful")
        setReason("")
        setSelectedDate(new Date(Date.now() + 1000 * 60 * 20).toISOString())
        router.push("/app/schedule-appointment")
      } else {
        enqueueSnackbar("Insufficient balance")
        setTimeout(() => {
          router.push("/app/my-wallet")
        }, 3000)
      }
    } else {
      enqueueSnackbar("All fields must be filled", {
        variant: "error",
      })
    }
  }

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked })
  // }

  return (
    <>
      <Grid container justify="center">
        <Grid item md={3} sm={1} xs={12} />
        <Grid item md={6} sm={9} xs={12} style={{ marginTop: 24 }}>
          <Card>
            <form>
              <CardBody>
                <Typography variant="h4" gutterBottom>
                  New Appointment
                </Typography>
                <Divider variant="fullWidth" component="div" />
                <Grid container className={classes.selectDoctorContainer}>
                  <Grid item md={6}>
                    {id && doctorName ? (
                      <Typography variant="h6">
                        {id && doctorName
                          ? `Dr. ${doctorName.firstName} ${doctorName.lastName}`
                          : ""}
                      </Typography>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => router.push("/app/see-doctor")}
                      >
                        Select a Doctor
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <KeyboardDatePicker
                        className={classes.marginTop}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Choose a date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        minDate={new Date()}
                        // fullWidth
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <KeyboardTimePicker
                        className={classes.marginTop}
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        // fullWidth
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
                <TextField
                  multiline
                  rows="3"
                  fullWidth
                  placeholder="Reason for appoinment"
                  id="standard-basic"
                  className={classes.marginTop}
                  variant="standard"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </CardBody>
              <CardFooter>
                <div className={classes.button}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Schedule
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </Grid>
        <Grid item md={3} sm={1} xs={12} />
        <Grid item xs={12} className={classes.marginTop}>
          <Accordion>
            <AccordionSummary
              expandIcon={<MdArrowDropDown />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                {" "}
                Upcoming Appointment{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments
                    .sort((a, b) => (b.date > a.date ? 1 : -1))
                    .map((history, i) => (
                      <Grid key={i} item md={4} sm={6} xs={12}>
                        <UpcomingAppointment
                          patient
                          name={history.doctor.name}
                          date={parseDate(history.date)}
                          reason={history.reason}
                          image={history.doctor.imageUrl}
                        />
                      </Grid>
                    ))
                ) : (
                  <Typography
                    variant="body1"
                    className={classes.my}
                    component="p"
                    color="textSecondary"
                  >
                    No upcoming appointment
                  </Typography>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<MdArrowDropDown />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                {" "}
                Overdue Appointments{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {overDueAppointments.length > 0 ? (
                overDueAppointments
                  .sort((a, b) => (b.date > a.date ? 1 : -1))
                  .map((history, i) => (
                    <div key={i}>
                      <AppointmentHistoryContainer
                        doctorName={history.doctor.name}
                        time="missed"
                        date={parseDate(history.date)}
                      />
                    </div>
                  ))
              ) : (
                <Typography
                  variant="body1"
                  className={classes.my}
                  component="p"
                  color="textSecondary"
                >
                  No overdue appointment
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<MdArrowDropDown />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                {" "}
                Previous Appointments
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {previousAppointments.length > 0 ? (
                previousAppointments
                  .sort((a, b) => (b.date > a.date ? 1 : -1))
                  .map((history, i) => (
                    <div key={i}>
                      <AppointmentHistoryContainer
                        doctorName={history.doctor.name}
                        time="past"
                        date={parseDate(history.date)}
                      />
                    </div>
                  ))
              ) : (
                <Typography
                  variant="body1"
                  className={classes.my}
                  component="p"
                  color="textSecondary"
                >
                  No previous appointment
                </Typography>
              )}{" "}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  )
}

export default ScheduleAppointment
