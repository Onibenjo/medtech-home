import React from "react"

import { MdFullscreen, MdFullscreenExit } from "react-icons/md"
import IconButton from "@material-ui/core/IconButton"

import useFullScreenToggle from "../../../hooks/useFullScreenToggle/useFullScreenToggle"

export default function ToggleFullscreenButton() {
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle()

  return (
    <IconButton aria-label="full screen" onClick={toggleFullScreen}>
      {isFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
    </IconButton>
  )
}
