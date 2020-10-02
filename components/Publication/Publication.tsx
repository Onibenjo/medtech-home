import React from "react"
import {
  AudioTrack as IAudioTrack,
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
  Track,
} from "twilio-video"
import useTrack from "../../hooks/useTrack/useTrack"
import AudioTrack from "../AudioTrack/AudioTrack"
import VideoTrack from "../VideoTrack/VideoTrack"

import { IVideoTrack } from "../../types"

interface PublicationProps {
  publication: LocalTrackPublication | RemoteTrackPublication
  participant: Participant
  isLocal: boolean
  disableAudio?: boolean
  videoPriority?: Track.Priority | null
}

export default function Publication({
  publication,
  isLocal,
  disableAudio,
}: PublicationProps) {
  const track = useTrack(publication)

  if (!track) return null

  switch (track.kind) {
    case "video":
      return (
        <VideoTrack
          track={track as IVideoTrack}
          isLocal={track.name.includes("camera") && isLocal}
        />
      )
    case "audio":
      return disableAudio ? null : <AudioTrack track={track as IAudioTrack} />
    default:
      return null
  }
}
