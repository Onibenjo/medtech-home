/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { format, getDay, getHours, getMinutes, set } from "date-fns"

import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Button from "@material-ui/core/Button"
import { Calendar } from "@material-ui/pickers"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import FadeIn from "react-fade-in"
import { FcExpand } from "react-icons/fc"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { IoMdArrowBack } from "react-icons/io"
import PatientWallet from "components/PatientWallet"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { useAuth } from "utils/use-auth"
import { useCollection } from "hooks/useCollection"
import { useSnackbar } from "notistack"

import JoinList from "../JoinQueueList/JoinList"

// interfaces
interface Hours {
  day: string
  start: string
  end: string
}
interface SimpleDialogProps {
  open: boolean
  onClose: () => void
  workingHours: Hours[]
  doctor: any
}
interface RangeState {
  start: Date | number | string
  end: Date | number | string
}

// functions
const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: "0 1.2rem 1rem",
      fontSize: "1rem",
      overflowY: "scroll",
      minHeight: 380,
      [theme.breakpoints.down("xs")]: {
        minHeight: "auto",
        overflowY: "scroll",
      },
    },
    walletContainer: {
      padding: "2rem 1.2rem 1rem",
      fontSize: "1rem",
      overflow: "hidden",
      minHeight: 380,
      [theme.breakpoints.down("xs")]: {
        minHeight: "auto",
        overflowY: "scroll",
      },
    },
    timePicker: {
      minHeight: "inherit",
      display: "flex",
      flexDirection: "column",
      "& > *": {
        marginTop: ".4rem",
      },
      "& > *:last-child": {
        marginTop: "auto",
      },
      "& > *:nth-child(2)": {
        zIndex: 999,
      },
    },
    btnContainer: {
      display: "flex",
      justifyContent: "space-around",
    },
    flexContainer: {
      padding: "1rem 0",
      display: "flex",
      // display: "grid",
      whiteSpace: "nowrap",
      //  gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
      // gridGap: "1rem",
      flexWrap: "wrap",
      justifyContent: "center",
      "& > *": {
        margin: 7,
      },
    },
    flexGrid: {
      padding: ".6rem 0",
      display: "flex",
      whiteSpace: "normal",
      flexWrap: "wrap",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    dateText: {
      whiteSpace: "normal",
      fontWeight: "bolder",
    },
    firstText: {
      whiteSpace: "normal",
      fontWeight: "bold",
      marginBottom: 7,
    },
    root: {
      width: "100%",
      marginBottom: 20,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
)
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thursday",
  "Friday",
  "Saturday",
]

const steps = ["home", "pickTime", "reason", "confirm", "success"]

const ScheduleModal = ({
  onClose,
  open,
  workingHours,
  doctor,
}: SimpleDialogProps) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()
  const [screen, setScreen] = useState("home")
  const [stepCount, setStepCount] = useState(0)
  const [lowBalance, setLowBalance] = useState(false)
  const [date, setDate] = useState(new Date())
  const [reason, setReason] = useState("")
  const [interval, setInterval] = useState(0)
  const [range, updateRange] = useState<null | RangeState>(null)
  const [value, setValue] = useState<Date>(
    range ? new Date(range.start) : new Date()
  )
  const [dates, updateDates] = useState<Date[]>([])
  const [expanded, setExpanded] = useState(true)
  const { add } = useCollection("appointments", {
    skip: true,
  })
  const onChange = (val) => {
    setDate(val)
  }
  const getDateRange = () => {
    const x = getDay(date)
    const weekday = days[x]
    const selectedRange = workingHours.filter((hour) => hour.day === weekday)[0]

    if (selectedRange) {
      const end = set(date, {
        hours: getHours(new Date(selectedRange.end)),
        minutes: getMinutes(new Date(selectedRange.end)),
      })
      const start = set(date, {
        hours: getHours(new Date(selectedRange.start)),
        minutes: getMinutes(new Date(selectedRange.start)),
      })
      updateRange({
        ...selectedRange,
        end,
        start,
      })
      const year = start.getFullYear()
      const month = start.getMonth()
      const day = start.getDate()
      const hour = start.getHours()
      let mins = start.getMinutes()
      const datesArr = [start]
      while (datesArr[datesArr.length - 1] < end) {
        const newdate = new Date(year, month, day, hour, (mins += interval))
        if (newdate < end) datesArr.push(newdate)
        else break
        // dates.push(new Date(year, month, day, ++hour))
      }
      updateDates(datesArr)
    } else updateRange(null)
  }

  const handleBack = () => {
    setStepCount((count) => (count > 0 ? count - 1 : 0))
  }
  const handleNext = () => {
    setStepCount((count) => (count <= steps.length ? count + 1 : steps.length))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (reason !== "" && value) {
      if (user?.balance >= 600) {
        const dataToSend = {
          reason,
          doctor: {
            id: doctor.uid,
            name: `${doctor.firstName} ${doctor.lastName}`,
            imageUrl: doctor.thumbnail,
            email: doctor.email,
          },
          date: value.toISOString(),
          patient: {
            id: user.uid,
            name: `${user.firstName} ${user.lastName}`,
            thumbnail: user.thumbnail,
            imageUrl: user.imageUrl,
            email: user.email,
          },
          status: "pending",
          createdAt: new Date().toISOString(),
        }
        await add(dataToSend)
        enqueueSnackbar("Appointment was successful", { variant: "success" })
        setReason("")
        // router.push("/app/schedule-appointment")
        handleNext()
        // onClose()
      } else {
        enqueueSnackbar("Insufficient balance")
        setLowBalance(true)
      }
    } else {
      enqueueSnackbar("All fields must be filled", {
        variant: "error",
      })
    }
  }

  useEffect(() => setScreen(steps[stepCount]), [stepCount])
  useEffect(() => {
    if (lowBalance && user.balance > 600) setLowBalance(false)
  }, [lowBalance, user.balance])

  if (lowBalance) {
    return (
      <Dialog
        onClose={() => {
          setLowBalance(false)
          onClose()
        }}
        aria-labelledby="schedule-appointment"
        open={open}
        fullWidth
        maxWidth="xs"
      >
        <div className={classes.walletContainer}>
          <p>Insufficient Balance</p>
          <PatientWallet showTransaction={false} />
        </div>
      </Dialog>
    )
  }

  return (
    <>
      <Dialog
        onClose={onClose}
        aria-labelledby="schedule-appointment"
        open={open}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="schedule-appointment">
          {stepCount ? (
            <IconButton onClick={handleBack}>
              <IoMdArrowBack style={{ verticalAlign: "middle" }} />
            </IconButton>
          ) : null}
          {screen === "pickTime"
            ? "Select A Time"
            : screen === "reason"
            ? "Reason for appointment"
            : "Schedule Apointment"}
        </DialogTitle>
        <div className={classes.container}>
          {screen === "home" && (
            <FadeIn>
              <Accordion
                square
                expanded={expanded}
                onChange={(_, newExpanded) => setExpanded(newExpanded)}
                className={classes.root}
              >
                <AccordionSummary
                  expandIcon={<FcExpand />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    See your doctor's available days of the week
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    {workingHours.length ? (
                      workingHours.map(({ start, end, day }) => (
                        <Typography key={day}>
                          <b>{day}</b>:{" "}
                          {`${format(new Date(start), "p")} - ${format(
                            new Date(end),
                            "p"
                          )}`}
                        </Typography>
                      ))
                    ) : (
                      <Typography>No working hours</Typography>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Typography variant="h6">Book a Date</Typography>
              <Calendar onChange={onChange} date={date} disablePast />

              <Button
                variant="contained"
                size="large"
                style={{ marginTop: "2rem" }}
                onClick={handleNext}
                fullWidth
                color="secondary"
              >
                Next
              </Button>
            </FadeIn>
          )}
          {screen === "pickTime" && (
            <FadeIn className={classes.timePicker}>
              <p>Enter the duration of appointment in minutes</p>
              <div
                style={{
                  width: "90%",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="addMunites"
                  value={interval}
                  label="Add Minutes"
                  onChange={(e) => setInterval(Number(e.target.value))}
                  variant="outlined"
                  inputProps={{ type: "number" }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={getDateRange}
                  disabled={interval < 5}
                >
                  Check
                </Button>
              </div>
              <div className={classes.flexContainer}>
                {range &&
                  dates.map((rangeDate) => (
                    <Button
                      variant="contained"
                      key={rangeDate.toISOString()}
                      color={
                        rangeDate.valueOf() === value.valueOf()
                          ? "secondary"
                          : "default"
                      }
                      onClick={() => setValue(rangeDate)}
                    >
                      {format(rangeDate, "p")}
                    </Button>
                  ))}
              </div>
              <div className={classes.btnContainer}>
                <Button variant="outlined" color="primary" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                  // disabled={!range}
                >
                  Next
                </Button>
              </div>
            </FadeIn>
          )}
          {screen === "reason" && (
            <FadeIn className={classes.timePicker}>
              <div className={classes.flexContainer}>
                <TextField
                  multiline
                  rows="3"
                  fullWidth
                  placeholder="Reason for appointment"
                  id="appt-reason"
                  variant="standard"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div className={classes.btnContainer}>
                <Button variant="outlined" color="primary" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                >
                  Submit
                </Button>
              </div>
            </FadeIn>
          )}
          {screen === "confirm" && (
            <FadeIn className={classes.timePicker}>
              {user?.balance < 600 && (
                <div>
                  <JoinList />
                </div>
              )}
              <div className={classes.flexGrid}>
                <Typography
                  variant="h6"
                  component="h4"
                  align="center"
                  className={classes.firstText}
                >
                  Review and Book
                </Typography>
                <Typography align="center" variant="body1" component="h6">
                  You have added your appointment with Dr {doctor.firstName}{" "}
                  {doctor.lastName} on{" "}
                  <b>
                    <i>{value && format(value, "PPPp, eeee")}</i>
                  </b>
                  <Typography
                    variant="h6"
                    component="h6"
                    align="center"
                    className={classes.dateText}
                  >
                    Reason for appointment
                  </Typography>
                </Typography>
                <Typography variant="h6" align="center" component="h6">
                  {reason}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  component="h6"
                  className={classes.dateText}
                >
                  Payment{" "}
                </Typography>
                <Typography variant="body1" align="center" className="big">
                  {interval} minutes of Consultation #{interval * 120} <br />
                  0% discount <br />
                  Pay N{interval * 120}
                </Typography>
              </div>
              <div className={classes.btnContainer}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                  fullWidth
                  size="large"
                >
                  Confirm
                </Button>
              </div>
            </FadeIn>
          )}
          {screen === "success" && (
            <FadeIn className={classes.timePicker}>
              <Typography
                variant="h6"
                component="h4"
                align="center"
                className={classes.firstText}
              >
                Successful
              </Typography>
              <Typography align="center" variant="body1" component="h6">
                Appointment Request sent to Dr {doctor.firstName}{" "}
                {doctor.lastName}. You will receive a notification and an email
                once your doctor accepts the appointment.
              </Typography>
              <Typography align="center" variant="body1" component="h6">
                Kindly check your mail and notification regularly.
              </Typography>
            </FadeIn>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ScheduleModal
