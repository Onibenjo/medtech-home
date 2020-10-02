import React, { useState, useEffect } from "react"
import { useAuth } from "utils/use-auth"
import { useRouter } from "next/router"
import useTwilioVideo, {
  TwilioVideoProvider,
} from "../../hooks/useTwilioVideo/useTwilioVideo"
import DoctorVideoDisplay from "../VideoDisplay/DoctorVideoDisplay"
import VideoTesting from "../VideoDisplay/VideoTesting"

const Join = () => {
  const router = useRouter()
  const defaultRoom = router.query.room
  const {
    getParticipantToken,
    token,
    room: roomT,
    startVideo,
  } = useTwilioVideo()
  const { user } = useAuth()
  const [room] = useState(defaultRoom)
  const [testing, setTesting] = useState(true)

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
    <div>
      <DoctorVideoDisplay user={user} roomID={room} />
    </div>
  )
}

export default function Room2() {
  return (
    <TwilioVideoProvider>
      <Join />
    </TwilioVideoProvider>
  )
}
