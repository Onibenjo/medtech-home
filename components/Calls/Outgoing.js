import React, { useEffect, useRef } from "react"
import { makeStyles } from "@material-ui/core/styles"
// import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop"
import { MdCancel } from "react-icons/md"
import { Dialog, Avatar, IconButton } from "@material-ui/core"
import useAudio from "hooks/useAudio"
import { useAuth } from "utils/use-auth"
import { useRouter } from "next/router"
import firebase from "firebase/app"
import { useDocument } from "hooks/useDocument"
import paths from "paths"
import Slide from "@material-ui/core/Slide"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"
import { useSnackbar } from "notistack"
// import Button from "../CustomButtons/Button"

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    // position: "fixed",
    // overflow: "hidden",
  },
  "@keyframes ring": {
    "0%": { transform: "rotate(0)" },
    "1%": { transform: "rotate(3.0deg)" },
    "3%": { transform: "rotate(-2.8deg)" },
    "5%": { transform: "rotate(3.4deg)" },
    "7%": { transform: "rotate(-3.2deg)" },
    "9%": { transform: "rotate(3.0deg)" },
    "11%": { transform: "rotate(-2.8deg)" },
    "13%": { transform: "rotate(2.6deg)" },
    "15%": { transform: "rotate(-2.4deg)" },
    "17%": { transform: "rotate(2.2deg)" },
    "19%": { transform: "rotate(-2.0deg)" },
    "21%": { transform: "rotate(1.8deg)" },
    "23%": { transform: "rotate(-1.6deg)" },
    "25%": { transform: "rotate(1.4deg)" },
    "27%": { transform: "rotate(-1.2deg)" },
    "29%": { transform: "rotate(1.0deg)" },
    "31%": { transform: "rotate(-.8deg)" },
    "33%": { transform: "rotate(.6deg)" },
    "35%": { transform: "rotate(-.4deg)" },
    "37%": { transform: "rotate(.2deg)" },
    "39%": { transform: "rotate(-.1deg)" },
    "41%": { transform: "rotate(.1deg)" },
    "43%": { transform: "rotate(0)" },
    "100%": { transform: "rotate(0)" },
  },
  paper: {
    backgroundColor: "#121414",
    color: "white",
    height: "100%",
    width: "400px",
    borderStyle: "inherit",
    overflow: "hidden",
    fontSize: "20px",
  },
  paper2: {
    backgroundColor: "#fff",
    color: "black",
    height: "100%",
    maxWidth: "400px",
    textAlign: "center",
    borderStyle: "inherit",
    overflow: "hidden",
    fontSize: "20px",
  },
  modalContainer: {
    maxWidth: "100%",
  },
  button: {
    color: "red",
    animation: "$ring 3s 5.7s ease-in-out infinite",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(3, 0, 0, 15),
  },
}))

const secondsToTime = (sec) => {
  const secs = Math.round(sec)
  const hour = Math.floor(secs / (60 * 60))

  const divisorForMinutes = secs % (60 * 60)
  const minute = Math.floor(divisorForMinutes / 60)

  const divisorForSeconds = divisorForMinutes % 60
  const second = Math.ceil(divisorForSeconds)

  const obj = {
    hour,
    minute,
    second,
  }

  return obj
}

const basePrice = 120

const OutgoingCall = ({
  open,
  open2,
  handleOpen,
  handleClose,
  handleClose2,
  doctor,
  callId,
  // balance,
  // walletLoading,
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { play, toggle, pause } = useAudio("/audio/calling.mp3", { loop: true })
  const timerRef = useRef(null)
  const router = useRouter()

  const {
    user: { uid: id, balance },
  } = useAuth()
  const { update } = useDocument(`calls/${callId}`, {
    listen: true,
    skip: !callId,
  })

  const { hour, minute, second } = secondsToTime(0)
  const [time, setTime] = React.useState({
    hours: hour,
    minutes: minute,
    seconds: second,
  })

  // variables
  const doctorFullName = `${doctor.firstName} ${doctor.lastName}`
  const avatar = doctor.imageUrl
  const isOnline = doctor.online

  React.useEffect(() => {
    // if (walletLoading) return
    // update({ balance: 60 })
    const priceToCalc = balance
    // setInitialAmount(priceToCalc)

    const priceTime = (priceToCalc / basePrice) * 60
    // const priceTime = priceToCalc / (60 * basePrice)

    const calcTime = secondsToTime(priceTime)
    setTime({
      hours: calcTime.hour,
      minutes: calcTime.minute,
      seconds: calcTime.second,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance])

  function getMessage() {
    firebase.messaging().onMessage((message) => {
      console.log("foreground ", message)
      const { data } = message
      if (data && data.type === "call") {
        if (data.status === "accept") {
          update({ status: "accepted" })
          enqueueSnackbar("Redirecting...", {
            variant: "success",
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
          })
          router.push({
            pathname: paths.patientRoom,
            query: { room: `${id}-${data.id}`, token: data.token },
          })
          handleClose()
        } else {
          update({ status: "rejected" })
          handleClose()
          enqueueSnackbar("Doctor is not available", {
            variant: "info",
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
          })
        }
      }
    })
  }
  useEffect(() => {
    getMessage()
    timerRef.current = null
    if (open) {
      play()
      timerRef.current = setTimeout(() => {
        handleClose()
        update({ status: "rejected" })
      }, 60000)
    }

    return () => {
      clearTimeout(timerRef.current)
      pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const sufficientBalance = (
    <div>
      <DialogTitle>
        <span>Account Balance N{balance}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          ` Account Balance sufficient for{" "}
          <span style={{ fontWeight: "bolder" }}>
            {" "}
            {time.hours.toString().padStart(2, "0")}:
            {time.minutes.toString().padStart(2, "0")}:
            {time.seconds.toString().padStart(2, "0")}
          </span>
          ` minutes call session
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose2()
            router.push("/app/my-wallet")
          }}
          color="primary"
        >
          Top Account
        </Button>
        <Button
          onClick={() => {
            handleOpen()
            handleClose2()
          }}
          color="secondary"
        >
          Continue call
        </Button>
      </DialogActions>
    </div>
  )

  const insufficientBalance = (
    <div>
      <DialogTitle>
        <span style={{ color: "red" }}>Insufficient balance N{balance}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: "black", fontSize: "1.5rem" }}>
          Minimum balance for Video/Voice call N600/(5mins) Kindly fund your
          wallet
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose()
            router.push("/app/my-wallet")
          }}
          color="primary"
        >
          Fund Wallet
        </Button>
      </DialogActions>
    </div>
  )

  const notOnline = (
    <div>
      <DialogTitle>
        <span style={{ color: "red" }}>Doctor is not online</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{ color: "black", fontSize: "1.5rem", textAlign: "center" }}
        >
          Book an appointment
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            router.push(`/app/schedule-appointment?id=${doctor.uid}`)
          }}
          color="primary"
        >
          Book Appointment
        </Button>
      </DialogActions>
    </div>
  )

  return (
    <div>
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.paper2}>
          {!isOnline
            ? notOnline
            : balance >= 600
            ? sufficientBalance
            : insufficientBalance}
        </div>
      </Dialog>
      <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={classes.paper}>
            <Avatar
              src={avatar}
              alt={doctorFullName}
              className={classes.large}
            />
            <p>Calling...</p>
            <h3> Doctor {doctorFullName}</h3>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  update({ status: "cancelled" })
                  handleClose()
                  toggle()
                }}
              >
                <MdCancel size={60} className={classes.button} />
              </IconButton>
            </span>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "15px",
                marginTop: "0px",
              }}
            >
              <p style={{ marginTop: "0px" }}>End</p>
            </span>
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default OutgoingCall
