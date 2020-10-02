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
  // const [supportsFacingMode, setSupportsFacingMode] = useState<boolean | null>(
  const [supportsFacingMode, setSupportsFacingMode] = useState(null)

  const videoTrack = localTracks.find((track) => track.name.includes("camera"))
  // const videoTrack = ((localTracks as LocalVideoTrack[]).find((track) =>
  //   track.name.includes("camera")
  // ) as unknown) as LocalVideoTrack
  const mediaStreamTrack = useMediaStreamTrack(videoTrack)

  useEffect(() => {
    // If 'facingMode' exists, we will set supportsFacingMode to true.
    // However, if facingMode is ever undefined again (when the user unpublishes video), we
    // won't set 'supportsFacingMode' to false. This prevents the icon from briefly
    // disappearing when the user switches their front/rear camera.
    const currentFacingMode = mediaStreamTrack?.getSettings().facingMode
    if (currentFacingMode && supportsFacingMode === null) {
      setSupportsFacingMode(true)
    }
  }, [mediaStreamTrack, supportsFacingMode])

  // const toggleFacingMode = () => {
  //   const newFacingMode =
  //     mediaStreamTrack?.getSettings().facingMode === "user"
  //       ? "environment"
  //       : "user"
  //   alert(JSON.stringify(newFacingMode, null, 2))

  //   videoTrack.restart({
  //     //   ...(DEFAULT_VIDEO_CONSTRAINTS as {}),
  //     facingMode: newFacingMode,
  //   })

  // }
  const toggleFacingMode = useCallback(() => {
    // alert(JSON.stringify(mediaStreamTrack, null, 2))
    const newFacingMode =
      mediaStreamTrack?.getSettings().facingMode === "user"
        ? "environment"
        : "user"

    // videoTrack.restart({
    //   //   ...(DEFAULT_VIDEO_CONSTRAINTS as {}),
    //   facingMode: newFacingMode,
    // })
    // Capture the back facing camera.
    // const backFacingTrack = getLocalVideoTrack({ facingMode: newFacingMode })

    // Switch to the back facing camera.
    // videoTrack.stop()
    localParticipant.unpublishTrack(videoTrack)
    // localParticipant.publishTrack(backFacingTrack)

    // const localTrackPublication = localParticipant?.unpublishTrack(videoTrack)
    // localParticipant?.emit("trackUnpublished", localTrackPublication)
    removeLocalVideoTrack()
    getLocalVideoTrack({ facingMode: newFacingMode }).then((track) =>
      localParticipant.publishTrack(track, { priority: "low" })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaStreamTrack, videoTrack])

  return supportsFacingMode ? (
    <IconButton onClick={toggleFacingMode} disabled={!videoTrack}>
      <RiCameraSwitchLine />
    </IconButton>
  ) : null
}
