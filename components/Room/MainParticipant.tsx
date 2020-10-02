import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { LocalVideoTrack, Participant, RemoteVideoTrack } from "twilio-video"
import useIsTrackSwitchedOff from "hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff"
import usePublications from "hooks/usePublications/usePublications"
import useTrack from "hooks/useTrack/useTrack"
import { MdVideocamOff } from "react-icons/md"

const useStyles = makeStyles({
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gridArea: "participantList",
  },
  isVideoSwitchedOff: {
    "& video": {
      filter: "blur(4px) grayscale(1) brightness(0.5)",
    },
  },
  identity: {
    background: "rgba(0, 0, 0, 0.1)",
    padding: "0.1em 0.3em",
    margin: "1em",
    fontSize: "1.2em",
    display: "inline-flex",
    "& svg": {
      marginLeft: "0.3em",
    },
  },
  infoContainer: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    padding: "0.4em",
    width: "100%",
  },
})

interface MainParticipantInfoProps {
  participant: Participant
  children: React.ReactNode
}

export default function MainParticipantInfo({
  participant,
  children,
}: MainParticipantInfoProps) {
  const classes = useStyles()

  const publications = usePublications(participant)
  const videoPublication = publications.find((p) =>
    p.trackName.includes("camera")
  )
  const screenSharePublication = publications.find((p) =>
    p.trackName.includes("screen")
  )
  const isVideoEnabled = Boolean(videoPublication)

  const videoTrack = useTrack(screenSharePublication || videoPublication)
  const isVideoSwitchedOff = useIsTrackSwitchedOff(
    videoTrack as LocalVideoTrack | RemoteVideoTrack
  )

  return (
    <div
      data-cy-main-participant
      className={clsx(classes.container, {
        [classes.isVideoSwitchedOff]: isVideoSwitchedOff,
      })}
    >
      <div className={classes.infoContainer}>
        <h4 className={classes.identity}>
          {participant.identity}
          {!isVideoEnabled && <MdVideocamOff />}
        </h4>
      </div>
      {children}
    </div>
  )
}