import { useState, useRef } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import clsx from "classnames"
import { useRouter } from "next/router"
import CountDown from "components/CountDown"
import { useAuth } from "utils/use-auth"
import ReviewModal from "components/Room/ReviewModal"
import EndCallButton from "./EndCallButton/EndCallButton"
import ToggleAudioButton from "./ToggleAudioButton/ToggleAudioButton"
import ToggleVideoButton from "./ToggleVideoButton/ToggleVideoButton"
import useIsUserActive from "./useIsUserActive/useIsUserActive"
import useRoomState from "../../hooks/useRoomState/useRoomState"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      position: "absolute",
      right: "50%",
      transform: "translate(50%, 30px)",
      bottom: "50px",
      zIndex: 1,
      transition: "opacity 1.2s, transform 1.2s, visibility 0s 1.2s",
      opacity: 0,
      visibility: "hidden",
      maxWidth: "min-content",
      "&.showControls, &:hover": {
        transition: "opacity 0.6s, transform 0.6s, visibility 0s",
        opacity: 1,
        visibility: "visible",
        transform: "translate(50%, 0px)",
      },
      [theme.breakpoints.down("xs")]: {
        bottom: `${theme.sidebarMobileHeight + 3}px`,
      },
    },
  })
)

export default function Controls() {
  const classes = useStyles()
  const roomState = useRoomState()
  const { user } = useAuth()
  const isReconnecting = roomState === "reconnecting"
  const isUserActive = useIsUserActive()
  const showControls = isUserActive || roomState === "disconnected"
  // const [initialAmount, setInitialAmount] = useState(0)
  const [startingAmount, setStartingAmount] = useState(0)
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  // const [price, setPrice] = useState(false)
  const router = useRouter()
  const docId = router.query.room
    ? router.query.room.toString().split("-")[1]
    : ""

  const handleClose = () => {
    setOpen(false)
  }
  const isPatient = user.type === "patient"
  const timeRef = useRef({ hours: 0, minutes: 0, seconds: 0 })
  const initialTimeRef = useRef({ hours: 0, minutes: 0, seconds: 0 })
  const initialAmountRef = useRef(0)

  return (
    <>
      <div className={clsx(classes.container, { showControls })}>
        {roomState !== "disconnected" && isPatient && (
          <CountDown
            // setInitialAmount={setInitialAmount}
            docId={docId}
            setStartingAmount={setStartingAmount}
            timeRef={timeRef}
            initialAmountRef={initialAmountRef}
            initialTimeRef={initialTimeRef}
            done={done}
          />
        )}
        <ToggleAudioButton disabled={isReconnecting} />
        <ToggleVideoButton disabled={isReconnecting} />
        {roomState !== "disconnected" && (
          <>
            <EndCallButton
              // initialAmount={initialAmount}
              initialAmount={initialAmountRef.current}
              startingAmount={startingAmount}
              isPatient={isPatient}
              docId={docId}
              patientId={user.uid}
              handleOpen={() => setOpen(true)}
              timeRef={timeRef}
              initialTimeRef={initialTimeRef}
              setDone={setDone}
            />
          </>
        )}
      </div>
      {isPatient && <ReviewModal open={open} handleClose={handleClose} />}
    </>
  )
}
