import React, { useRef, useEffect } from "react"
import { styled } from "@material-ui/core/styles"
// import { Track } from "twilio-video"
import useMediaStreamTrack from "hooks/useTwilio/useMediaStreamTrack"
import { IVideoTrack } from "../../types"

const Video = styled("video")({
  width: "100%",
  maxHeight: "100%",
  objectFit: "contain",
})

interface VideoTrackProps {
  track: IVideoTrack
  isLocal?: boolean
}

export default function VideoTrack({ track, isLocal }: VideoTrackProps) {
  const ref = useRef<HTMLVideoElement>(null!)
  const mediaStreamTrack = useMediaStreamTrack(track)

  useEffect(() => {
    const el = ref.current
    el.muted = true
    track.attach(el)
    return () => {
      track.detach(el)
    }
  }, [track])

  // The local video track is mirrored if it is not facing the environment.
  const isFrontFacing =
    mediaStreamTrack?.getSettings().facingMode !== "environment"
  const style = isLocal && isFrontFacing ? { transform: "rotateY(180deg)" } : {}

  return <Video ref={ref} style={style} />
}
