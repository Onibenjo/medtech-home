import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core"

import Grid from "@material-ui/core/Grid"
import { MdArrowDropDown } from "react-icons/md"
import Typography from "@material-ui/core/Typography"
import formatRelative from "date-fns/formatRelative"
import { makeStyles } from "@material-ui/core/styles"
import parseISO from "date-fns/parseISO"
import { useAuth } from "utils/use-auth"
import { useCollection } from "hooks/useCollection"
import UpcomingAppointment from "./UpcomingAppointment"
import AppointmentHistoryContainer from "./AppointmentHistoryContainer"

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

const parseDate = (date) => {
  return `${formatRelative(parseISO(date), new Date())}`
}

const ScheduleAppointment = () => {
  const classes = useStyles()
  const { user } = useAuth()

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

  return (
    <>
      <Grid container justify="center">
        <Grid item md={3} sm={1} xs={12} />
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
