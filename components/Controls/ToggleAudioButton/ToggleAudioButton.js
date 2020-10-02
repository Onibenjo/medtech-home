/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import Fab from "@material-ui/core/Fab"
import { MdMic, MdMicOff } from "react-icons/md"
import Tooltip from "@material-ui/core/Tooltip"

import useLocalAudioToggle from "../../../hooks/useLocalAudioToggle/useLocalAudioToggle"

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      fontSize: "1.2rem",
    },
  })
)

export default function ToggleAudioButton(props) {
  const classes = useStyles()
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle()

  return (
    <Tooltip
      title={isAudioEnabled ? "Mute Audio" : "Unmute Audio"}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab
        className={classes.fab}
        onClick={toggleAudioEnabled}
        disabled={props.disabled}
        data-cy-audio-toggle
      >
        {isAudioEnabled ? <MdMic /> : <MdMicOff />}
      </Fab>
    </Tooltip>
  )
}
