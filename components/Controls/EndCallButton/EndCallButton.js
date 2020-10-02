/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react"
import { MdCallEnd } from "react-icons/md"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import Tooltip from "@material-ui/core/Tooltip"
import firebase from "firebase/app"
import useVideoContext from "hooks/useVideoContext/useVideoContext"
import { useDocument } from "hooks/useDocument"
import { useCollection } from "hooks/useCollection"

// const findIP = new Promise((r) => {
//   const w = window
//   const a = new (w.RTCPeerConnection ||
//     w.mozRTCPeerConnection ||
//     w.webkitRTCPeerConnection)({ iceServers: [] })
//   const b = () => {}
//   a.createDataChannel("")
//   a.createOffer((c) => a.setLocalDescription(c, b, b), b)
//   a.onicecandidate = (c) => {
//     try {
//       c.candidate.candidate
//         .match(
//           /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
//         )
//         .forEach(r)
//     } catch (e) {}
//   }
// })

// async function ip(url) {
//   const ip3 = await fetch(url)
//   const fr = await ip3.json()
//   return fr
// }

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      fontSize: "1.2rem",
      color: theme.palette.common.white,
      background: theme.palette.error.main,
      "&:hover": {
        background: theme.palette.error.dark,
      },
    },
  })
)

const secondsToTime = (sec) => {
  const secs = Math.round(sec)
  const hour = Math.floor(secs / (60 * 60))

  const divisorForMinutes = secs % (60 * 60)
  const minute = Math.floor(divisorForMinutes / 60)

  const divisorForSeconds = divisorForMinutes % 60
  const second = Math.ceil(divisorForSeconds)

  return `${hour}:${minute}:${second}`
}

export default function EndCallButton({
  initialAmount,
  docId,
  isPatient,
  patientId,
  handleOpen,
  startingAmount,
  timeRef,
  initialTimeRef,
  setDone,
}) {
  const classes = useStyles()
  const { room } = useVideoContext()
  // console.log(initialAmount);
  // firebase
  const { update } = useDocument(`patients/${patientId}/private/wallet`, {
    skip: true,
  })
  const { update: docUpdate } = useDocument(`doctors/${docId}/private/wallet`, {
    skip: true,
  })
  const { data: doctorDetail } = useDocument(`doctors/${docId}`)

  const { add } = useCollection(`doctors/${docId}/transactions`, {
    skip: true,
  })
  const { hours, minutes, seconds } = timeRef.current
  const {
    hours: ihours,
    minutes: iminutes,
    seconds: iseconds,
  } = initialTimeRef.current

  const currentSec = hours * 60 * 60 + minutes * 60 + seconds
  const initSec = ihours * 60 * 60 + iminutes * 60 + iseconds

  const handleEnd = async () => {
    setDone(true)
    if (isPatient) {
      if (doctorDetail && doctorDetail.service !== "volunteer") {
        update({ balance: initialAmount })
        docUpdate({
          balance: firebase.firestore.FieldValue.increment(
            (startingAmount - initialAmount) * 0.8
          ),
        })
      } else if (doctorDetail && doctorDetail.service === "volunteer")
        update({ balance: initialAmount / 2 })
      updateApp({
        status: "completed",
      })
      // const ip = await findIP
      // const { ip: ipAddress } = await ip("https://api.ipify.org/?format=json")
      const time = new Date().toISOString()

      add({
        amount: (startingAmount - initialAmount) * 0.8,
        // ipAddress,
        currency: "NGN",
        type: "deposit",
        reason: "Video call",
        duration: secondsToTime(initSec - currentSec),
        time,
      })
    }
    handleOpen()
    room.disconnect()
  }

  return (
    <>
      <Tooltip
        title="End Call"
        onClick={handleEnd}
        placement="top"
        PopperProps={{ disablePortal: true }}
      >
        <Fab className={classes.fab}>
          <MdCallEnd />
        </Fab>
      </Tooltip>
    </>
  )
}
