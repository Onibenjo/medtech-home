import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
// import Button from "@material-ui/core/Button"
import { db } from "utils/lib/firebase"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@material-ui/core"
import { MdArrowDropDown } from "react-icons/md"
import parseISO from "date-fns/parseISO"
import formatRelative from "date-fns/formatRelative"
import { useCollection } from "hooks/useCollection"
import DoctorAppointmentDialog from "./DoctorAppointmnetDialog"
import IncomingAppointment from "./IncomingAppointment"
import AppointmentHistoryContainer from "./AppointmentHistoryContainer"
import { useAuth } from "../../utils/use-auth"
import Upcoming from "./Upcoming"

const useStyles = makeStyles(() => ({
  my: {
    margin: "16px 0",
  },
  patientbtn: {
    textAlign: "center",
  },
  rotate: {
    animation: `$rotates 1s linear infinite`,
  },
  "@keyframes rotates": {
    "100%": {
      transform: " rotate(360deg)",
    },
  },
}))

export default function DoctorAppointment() {
  const classes = useStyles()
  const { user } = useAuth()
  // const [loadMore, setLoadMore] = useState(false)
  // const [upcomingAppointments, setUpcomingAppointments] = useState([])
  // const [incomingAppointments, setIncomingAppointments] = useState([])
  // const [previousAppointments, setPreviousAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  // const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [userDetails, setUserDetails] = useState("")
  // const [overDueAppointments, setOverDueAppointments] = useState([])
  // firebase hooks refactor due to
  // the onsnapshot change callback function absence
  // const { data: allAppointments } = useCollection("appointments", {
  //   where: ["doctor.id", "==", user.uid],
  // })
  const { data: previousAppointments } = useCollection("appointments", {
    where: [
      ["doctor.id", "==", user.uid],
      ["status", "==", "completed"],
    ],
    limit: 5,
  })
  const { data: incomingAppointments, loading: isLoading } = useCollection(
    "appointments",
    {
      listen: true,
      where: [
        ["doctor.id", "==", user.uid],
        ["status", "==", "pending"],
      ],
    }
  )

  const { data: overDueAppointments } = useCollection("appointments", {
    // listen: true,
    where: [
      ["doctor.id", "==", user.uid],
      ["status", "==", "overdue"],
    ],
    orderBy: ["date", "desc"],
    limit: 5,
  })

  // useEffect(() => {
  // const myAppointments = db
  //   .collection("appointments")
  //   .where("doctor.id", "==", user.uid)
  //   .onSnapshot((snap) => {
  //     const allAppointments = snap.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }))
  // const filteredAppointments = allAppointments.filter(
  //   (app) => new Date(app.date) > new Date()
  // )
  // const overDueAppointments2 = allAppointments.filter(
  //   (app) => new Date(app.date) <= new Date()
  // )

  // setUpcomingAppointments(
  //   filteredAppointments.filter((pend) => pend.status === "accepted")
  // )
  // setPreviousAppointments(
  //   allAppointments.filter((pend) => pend.status === "completed")
  // )
  // setIncomingAppointments(
  //   filteredAppointments.filter((pend) => pend.status === "pending")
  // )
  // setOverDueAppointments(
  //   overDueAppointments2.filter((pend) => pend.status !== "completed")
  // )
  // setIsLoading(false)
  // })

  // return () => myAppointments()
  // }, [allAppointments, load, user.uid])

  const parseDate = (date) => {
    return `${formatRelative(parseISO(date), new Date())}`
  }
  const handleClickOpen = async (id) => {
    setOpen(true)
    const patientdetails = await db.collection("patients").doc(id).get()
    setUserDetails(patientdetails.data())
    setLoading(false)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onAccept = (appId, id, name, reason) => {
    db.collection("appointments")
      .doc(appId)
      .update({ status: "accepted" })
      .then(() => {
        db.collection("doctors")
          .doc(user.uid)
          .collection("mypatients")
          .doc(id)
          .set({ patientID: id, patientName: name, diagnosis: reason })
      })
  }
  return (
    <div style={{ marginTop: 20 }}>
      <DoctorAppointmentDialog
        loading={loading}
        userDetails={userDetails}
        handleClose={handleClose}
        open={open}
      />
      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography
            variant="h5"
            className={classes.my}
            component="h4"
            color="textSecondary"
          >
            New Appointment
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={1}>
            {isLoading ? (
              <AiOutlineLoading3Quarters className={classes.rotate} />
            ) : incomingAppointments.length > 0 ? (
              incomingAppointments.map((app, i) => (
                <Grid key={i} item md={5} sm={6} xs={12}>
                  <IncomingAppointment
                    image={app.patient.imageUrl ? app.patient.imageUrl : ""}
                    id={app.id}
                    reason={app.reason}
                    date={parseDate(app.date)}
                    name={app.patient.name}
                    handleClickOpen={() => handleClickOpen(app.patient.id)}
                    handleAccept={() =>
                      onAccept(
                        app.id,
                        app.patient.id,
                        app.patient.name,
                        app.reason
                      )
                    }
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
                No incoming appointment
              </Typography>
            )}
            <Grid container spacing={2}>
              <Upcoming handleClickOpen={handleClickOpen} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography
            variant="h5"
            className={classes.my}
            component="h4"
            color="textSecondary"
          >
            Overdue Appointments
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          {overDueAppointments.length > 0 ? (
            overDueAppointments.map((history, i) => (
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
          <Typography
            variant="h5"
            className={classes.my}
            component="h4"
            color="textSecondary"
          >
            Previous Appointment
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item md={12} className={classes.marginTop}>
              {isLoading ? (
                <AiOutlineLoading3Quarters className={classes.rotate} />
              ) : previousAppointments.length > 0 ? (
                previousAppointments.map((history, i) => (
                  <Grid key={i} item md={3} sm={6} xs={12}>
                    <AppointmentHistoryContainer
                      doctorName={history.patient.name}
                      time="past"
                      date={parseDate(history.date)}
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
                  No previous appointment
                </Typography>
              )}

              {/* {
          !loadMore ? 
        <div className={classes.patientbtn}>
          <Button variant="outlined" onClick={()=>setLoadMore(true)}  color="primary" >
              Load More
          </Button>
        </div>
          : null
        } */}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
