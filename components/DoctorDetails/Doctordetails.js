import Button from "@material-ui/core/Button"
import { MdCall } from "react-icons/md"
import Paper from "@material-ui/core/Paper"
import Rating from "@material-ui/lab/Rating"
import React from "react"
import Typography from "@material-ui/core/Typography"
import dynamic from "next/dynamic"
import fetchWithToken from "utils/lib/fetch"
import firebase from "firebase/app"
import { makeStyles } from "@material-ui/core/styles"
import { useAuth } from "utils/use-auth"
import { useCollection } from "hooks/useCollection"
import { useSnackbar } from "notistack"
import PatientReview from "./PatientReview"

// import DoctorStars from "../SeeDoctor/DoctorStars"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontSize: "1.2rem",
    alignItems: "center",
    flexWrap: "wrap",
    ...theme.typography.h6,
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  main: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "column",
    "& > *:not(:first-child)": {
      padding: "0 0 1rem 0",
    },
  },
  cardContent: {
    padding: 0,
    // paddingBottom: 24,
    "& > *": {
      margin: "1rem 0",
    },
  },
  rating: {
    display: "inline-flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  media: {
    width: 60,
    borderRadius: 50,
  },
  buttons: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    "& > *": {
      color: theme.palette.primary.contrastText,
    },
    justifyContent: "space-between",
    // marginBottom: "2rem",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "normal",
      "& button:last-child": {
        marginLeft: 10,
      },
    },
  },
  button: {
    background: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.dark),
  },
  imageContainer: { display: "flex", justifyContent: "start", marginRight: 16 },
  p0: { padding: 0, "& > *": { margin: ".5rem 0" } },
  doctorImage: {
    borderRadius: 18,
    marginBottom: 16,
    // height: 220,
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      width: 220,
    },
  },
}))

const OutgoingCall = dynamic(() => import("components/Calls/Outgoing"), {
  ssr: false,
})
const ScheduleModal = dynamic(
  () => import("components/Appointment/ScheduleModal"),
  {
    ssr: false,
  }
)

const ScheduleAppt = ({ doctor }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  // if (doctor.service !== "paid") return null
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}
        size="small"
        className={classes.bookAppt}
      >
        Book Appointment
      </Button>
      <ScheduleModal
        doctor={doctor}
        open={open}
        onClose={handleClose}
        workingHours={doctor.workingHours || []}
      />
    </>
  )
}

const Doctordetails = ({ doctor, setFullProfile }) => {
  const classes = useStyles()
  // const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const [callId, setCallId] = React.useState("")
  const { user } = useAuth()
  const { add } = useCollection("calls", {
    skip: true,
  })
  const { data: reviews } = useCollection(`doctors/${doctor.uid}/reviews`, {
    orderBy: "createdAt",
    limit: 5,
  })
  // const [wallet, walletLoading] = useDocumentSnap(
  //   `patients/${user.uid}/private/wallet`
  // )

  const handleClose2 = () => {
    setOpen2(false)
  }

  const handleClickOpen = () => {
    setOpen2(true)
  }

  const handleOpen = async () => {
    // if (walletLoading) return
    try {
      if (user.balance < 600) {
        enqueueSnackbar("Insufficient balance", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        })
        return
      }
      const data = await fetchWithToken("/user/make-call", {
        body: {
          id: doctor.uid,
          type: "doctors",
          thumbnail: user.thumbnail,
        },
      })
      if (data.success) {
        const d = await add({
          patientId: user.uid,
          doctorId: doctor.uid,
          patientName: user.displayName,
          status: "missed",
          doctorName: `${doctor.firstName} ${doctor.lastName}`,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        // console.log({ d })
        setCallId(d[0])
        setOpen(true)
      }
    } catch (e) {
      // console.log(e)
      enqueueSnackbar("There was an error \n placing your call", {
        variant: "error",
      })
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className={classes.main}>
          {/* <div xs={12} sm={12} md={3}> */}
          {doctor && doctor.imageUrl ? (
            <div className={classes.imageContainer}>
              <img
                src={doctor.imageUrl}
                className={classes.doctorImage}
                alt="doctor"
              />
            </div>
          ) : null}
          {/* </div> */}
          <div xs={12} sm={12} md={8} className={classes.p0}>
            <Typography component="h6" className={classes.title} variant="h6">
              {doctor && doctor.firstName
                ? `Dr. ${doctor.firstName} ${doctor.lastName}`
                : null}
            </Typography>
            <Typography variant="body1" component="div" color="textSecondary">
              <span>
                {doctor && doctor.experience ? doctor.experience : null} Exp.
                Years
              </span>
              <Button color="secondary" component="span">
                {doctor.specialty}
              </Button>
            </Typography>
            <div className={classes.root}>
              <Rating
                name="half-rating-read"
                value={doctor.avgRating || 0}
                precision={0.1}
                readOnly
              />
              <span>{`(${doctor.numReviews || 0} Reviews)`}</span>
            </div>
            <Button
              // color="secondary"
              className={classes.button}
              variant="contained"
              size="medium"
              onClick={setFullProfile}
            >
              View Full Profile
            </Button>
          </div>
        </div>
        <div className={classes.cardContent}>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              // disableElevation
              size="small"
              onClick={handleClickOpen}
            >
              <MdCall /> Call now
            </Button>
            <ScheduleAppt doctor={doctor} />
          </div>

          <Typography component="h6" className={classes.title} variant="h6">
            Top reviews
          </Typography>
          {reviews.length ? (
            <Paper>
              <PatientReview reviews={reviews} />
            </Paper>
          ) : (
            "No review"
          )}
        </div>
      </div>
      <OutgoingCall
        open={open}
        open2={open2}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleClose2={handleClose2}
        doctor={doctor}
        callId={callId}
        // balance={user.balance}
        // loading={walletLoading}
      />
    </>
  )
}
export default Doctordetails
