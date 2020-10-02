import React, { useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import CircularProgress from "@material-ui/core/CircularProgress"
import Toolbar from "@material-ui/core/Toolbar"
import { Typography, Button } from "@material-ui/core"
import useTwilioVideo from "hooks/useTwilioVideo/useTwilioVideo"
import isProd from "utils/lib/isProd"
import LocalAudioLevelIndicator from "./LocalAudioLevelIndicator/LocalAudioLevelIndicator"
import ToggleFullscreenButton from "./ToggleFullScreenButton/ToggleFullScreenButton"
import FlipCameraButton from "./FlipCamera"
import FlipCamera from "./FlipCamera/index2"
import Menu from "./Menu/Menu"

import { useAuth } from "../../utils/use-auth"
import useRoomState from "../../hooks/useRoomState/useRoomState"
import useVideoContext from "../../hooks/useVideoContext/useVideoContext"

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
    },
    rightButtonContainer: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        marginLeft: "2.2em",
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    loadingSpinner: {
      marginLeft: "1em",
    },
    displayName: {
      margin: "1.1em 0.6em",
      fontWeight: 600,
    },
    joinButton: {
      margin: "1em",
    },
    toolbar: {
      [theme.breakpoints.down("xs")]: {
        padding: 0,
      },
    },
  })
)

export default function MenuBar() {
  const classes = useStyles()
  const { user } = useAuth()
  const { isConnecting } = useVideoContext()
  const { getParticipantToken, startVideo } = useTwilioVideo()
  const roomState = useRoomState()

  const name = user?.displayName || ""

  const handleJoin = () => {
    getParticipantToken({ identity: user.displayName, room: "test" })
    startVideo()
  }

  return (
    <AppBar className={classes.container} position="static">
      <Toolbar className={classes.toolbar}>
        {roomState === "disconnected" ? (
          <form className={classes.form}>
            <Typography className={classes.displayName} variant="body1">
              {user.displayName}
            </Typography>
            {!isProd && <Button onClick={handleJoin}>JoinTest</Button>}
            {isConnecting && (
              <CircularProgress className={classes.loadingSpinner} />
            )}
          </form>
        ) : (
          <h3>{name}</h3>
        )}
        <div className={classes.rightButtonContainer}>
          <FlipCameraButton />
          <FlipCamera />
          <LocalAudioLevelIndicator />
          <ToggleFullscreenButton />
          <Menu />
        </div>
      </Toolbar>
    </AppBar>
  )
}
