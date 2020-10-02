import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
// import Head from "next/head"
import useTwilioVideo from "../../hooks/useTwilioVideo/useTwilioVideo"

// import { useDocumentSnap } from "hooks/useDocument"
// import Controls from "../Controls/Controls"
// import CountDown from "components/CountDown"
import Room from "../Room/Room"

const DoctorVideoDisplay = ({ roomID, user }) => {
  const router = useRouter()
  const { token, activeRoom, startVideo, leaveRoom } = useTwilioVideo()

  // const [wallet, walletLoading, walletError] = useDocumentSnap(
  //   `patients/oceHvI5MKMcwG9Q1uNUIQCMMNmE3/private/wallet`)
  // const endCall = () => {
  //   leaveRoom()
  //   handleOpen()
  // }

  useEffect(() => {
    if (!roomID) {
      router.push("/app")
    }

    if (!token) {
      router.push("/app")
    }

    // Add a window listener to disconnect if the tab is closed. This works
    // around a looooong lag before Twilio catches that the video is gone.
    window.addEventListener("beforeunload", leaveRoom)

    return () => {
      window.removeEventListener("beforeunload", leaveRoom)
    }
  }, [token, roomID, activeRoom, startVideo, leaveRoom, router])

  return <Room isDoctor />
}

export default DoctorVideoDisplay
