import React from "react"
import { Participant as IParticipant } from "twilio-video"
import ParticipantTracks from "../ParticipantTracks/ParticipantTracks"

interface ParticipantProps {
  participant: IParticipant
  disableAudio?: boolean
}

export default function Participant({
  participant,
  disableAudio,
}: ParticipantProps) {
  return (
    <ParticipantTracks participant={participant} disableAudio={disableAudio} />
  )
}
