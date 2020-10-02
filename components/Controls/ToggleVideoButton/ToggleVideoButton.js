/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import { useRef, useCallback } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import Fab from "@material-ui/core/Fab"
import Tooltip from "@material-ui/core/Tooltip"
import { MdVideocam, MdVideocamOff } from "react-icons/md"

import useLocalVideoToggle from "../../../hooks/useLocalVideoToggle/useLocalVideoToggle"

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      fontSize: "1.2rem",
    },
  })
)

export default function ToggleVideoButton(props) {
  const classes = useStyles()
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle()
  const lastClickTimeRef = useRef(0)

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 200) {
      lastClickTimeRef.current = Date.now()
      toggleVideoEnabled()
    }
  }, [toggleVideoEnabled])

  return (
    <Tooltip
      title={isVideoEnabled ? "Mute Video" : "Unmute Video"}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab
        className={classes.fab}
        // onClick={toggleVideoEnabled}
        onClick={toggleVideo}
        disabled={props.disabled}
      >
        {isVideoEnabled ? <MdVideocam /> : <MdVideocamOff />}
      </Fab>
    </Tooltip>
  )
}
