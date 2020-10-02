import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "utils/use-auth"
import VideoDisplay from "../VideoDisplay"
import VideoTesting from "../VideoDisplay/VideoTesting"
import ReviewModal from "./ReviewModal"
import useTwilioVideo, {
  TwilioVideoProvider,
} from "../../hooks/useTwilioVideo/useTwilioVideo"

const Join = () => {
  const router = useRouter()
  const { user } = useAuth()
  const defaultRoom = router.query.room
  const {
    getParticipantToken,
    token,
    room: roomT,
    startVideo,
  } = useTwilioVideo()
  const [room] = useState(defaultRoom)
  const [open, setOpen] = useState(false)
  const [testing, setTesting] = useState(true)

  // console.log(rest)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleStart = () => {
    setTesting(false)
    startVideo()
  }
  useEffect(() => {
    // if (user && !testing) {
    if (user) {
      getParticipantToken({ identity: user.displayName, room })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, user, testing])

  // if no user
  if (!user) return <p>Loading...</p>

  // to check for video and audio access
  if (testing) {
    return <VideoTesting setOpen={handleStart} open={testing} />
  }

  // return <CountDown leaveRoom={null} price={6000} />
  // all checks passed
  return !token && !roomT ? (
    // <ConnectingModal />
    <div>Connecting...</div>
  ) : (
    <>
      <VideoDisplay user={user} roomID={room} handleOpen={handleOpen} />
      <ReviewModal open={open} handleClose={handleClose} />
    </>
  )
}

export default function Room2() {
  return (
    <TwilioVideoProvider>
      <Join />
    </TwilioVideoProvider>
  )
}
