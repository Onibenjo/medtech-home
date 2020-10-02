import React, { useCallback, useEffect, useState } from "react"
import { RiCameraSwitchLine } from "react-icons/ri"
import { IconButton } from "@material-ui/core"
import { LocalVideoTrack } from "twilio-video"
import useMediaStreamTrack from "hooks/useTwilio/useMediaStreamTrack"
import useVideoContext from "hooks/useVideoContext/useVideoContext"
// import { DEFAULT_VIDEO_CONSTRAINTS } from "../../../constants"

export default function FlipCameraButton() {
  const {
    localTracks,
    room: { localParticipant },
    getLocalVideoTrack,
    removeLocalVideoTrack,
  } = useVideoContext()
  const [supportsFacingMode, setSupportsFacingMode] = useState(null)
  const videoTrack = localTracks.find((track) => track.name.includes("camera"))
  const mediaStreamTrack = useMediaStreamTrack(videoTrack)

  useEffect(() => {
    const currentFacingMode = mediaStreamTrack?.getSettings().facingMode
    if (currentFacingMode && supportsFacingMode === null) {
      setSupportsFacingMode(true)
    }
  }, [mediaStreamTrack, supportsFacingMode])

  const toggleFacingMode = useCallback(async () => {
    alert(JSON.stringify(mediaStreamTrack.getSettings(), null, 2))
    const newFacingMode =
      mediaStreamTrack?.getSettings().facingMode === "user"
        ? "environment"
        : "user"

    await videoTrack.restart({
      facingMode: newFacingMode,
    })
    // Capture the back facing camera.
    // const backFacingTrack = getLocalVideoTrack({ facingMode: newFacingMode })

    // Switch to the back facing camera.
    // videoTrack.stop()
    // localParticipant.unpublishTrack(videoTrack)
    // // localParticipant.publishTrack(backFacingTrack)

    // // const localTrackPublication = localParticipant?.unpublishTrack(videoTrack)
    // // localParticipant?.emit("trackUnpublished", localTrackPublication)
    // removeLocalVideoTrack()
    // getLocalVideoTrack({ facingMode: newFacingMode }).then((track) =>
    //   localParticipant.publishTrack(track, { priority: "low" })
    // )
  }, [mediaStreamTrack, videoTrack])

  return supportsFacingMode ? (
    <IconButton onClick={toggleFacingMode} disabled={!videoTrack}>
      <RiCameraSwitchLine />
    </IconButton>
  ) : null
}
