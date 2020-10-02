import React from "react"
import { Participant as IParticipant } from "twilio-video"
import ParticipantTracks from "../ParticipantTracks/ParticipantTracks"

interface ParticipantProps {
  participant: IParticipant
  disableAudio?: boolean
  enableScreenShare?: boolean
}

export default function Participant({
  participant,
  disableAudio,
  enableScreenShare,
}: ParticipantProps) {
  return (
    <ParticipantTracks
      participant={participant}
      disableAudio={disableAudio}
      enableScreenShare={enableScreenShare}
    />
  )
}
