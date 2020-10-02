import React, { useEffect } from "react"
import LocalAudioLevelIndicator from "components/MenuBar/LocalAudioLevelIndicator/LocalAudioLevelIndicator"
import LocalVideoPreview from "components/LocalVideoPreview"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import useAudio from "hooks/useAudio"
// import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { MdCheck, MdCancel, MdPlayCircleOutline } from "react-icons/md"
import UnsupportedBrowserWarning from "components/UnsupportedBrowserWarning/UnsupportedBrowserWarning"

// import Button from "components/CustomButtons/Button"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      fontFamily: "'Poppins', 'Raleway', sans-serif",
      textAlign: "center",
    },
    root: {
      display: "flex",
      //   justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
      marginBottom: theme.spacing(3),
    },
    titleRoot: {
      textAlign: "center",
    },
    error: {
      color: theme.palette.error.main,
    },
    success: {
      color: theme.palette.success.main,
    },
  })
)

const VideoTesting = ({ setOpen, open }) => {
  const classes = useStyles()
  const [videoCheck, setVideoCheck] = React.useState<null | boolean>(null)
  const [audioCheck, setAudioCheck] = React.useState<null | boolean>(null)
  const [ready, setReady] = React.useState<boolean>(false)
  const { play } = useAudio("/audio/ringtone.ogg")

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (videoCheck && audioCheck) {
      setReady(true)
    }
  }, [videoCheck, audioCheck])

  return (
    <UnsupportedBrowserWarning>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
        // fullWidth
        // maxWidth="md"
      >
        <DialogTitle
          id="form-dialog-title"
          classes={{ root: classes.titleRoot }}
        >
          Just a few checks before your session
        </DialogTitle>
        <DialogContent className={classes.container}>
          {/* <DialogContentText>
             
            </DialogContentText> */}
          <Grid container spacing={2} justify="center">
            {ready ? (
              <Grid item sm={12}>
                <Typography>You are all set</Typography>
                <Typography>Click start to begin your session</Typography>
                <Button color="secondary" onClick={() => handleClose()}>
                  Start
                </Button>
              </Grid>
            ) : (
              <>
                <Grid item xs={11} sm={6}>
                  <Typography>
                    Click play and tell us if you can hear a sound
                  </Typography>
                  {audioCheck ? (
                    <MdCheck className={classes.success} size={70} />
                  ) : audioCheck === false ? (
                    <MdCancel className={classes.error} size={60} />
                  ) : (
                    <>
                      <br />
                      <LocalAudioLevelIndicator />
                      <br />
                      <IconButton onClick={play}>
                        <MdPlayCircleOutline size={50} />
                      </IconButton>
                      <div>
                        <IconButton onClick={() => setAudioCheck(false)}>
                          <MdCancel className={classes.error} size={30} />
                        </IconButton>
                        <IconButton onClick={() => setAudioCheck(true)}>
                          <MdCheck className={classes.success} size={30} />
                        </IconButton>
                      </div>
                    </>
                  )}
                </Grid>
                <Grid item xs={11} sm={6}>
                  <Typography>Can you see yourself?</Typography>
                  {videoCheck ? (
                    <MdCheck className={classes.success} size={70} />
                  ) : videoCheck === false ? (
                    <MdCancel className={classes.error} size={60} />
                  ) : (
                    <>
                      <LocalVideoPreview />
                      <div>
                        <IconButton onClick={() => setVideoCheck(false)}>
                          <MdCancel className={classes.error} size={30} />
                        </IconButton>
                        <IconButton onClick={() => setVideoCheck(true)}>
                          <MdCheck className={classes.success} size={30} />
                        </IconButton>
                      </div>
                    </>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </UnsupportedBrowserWarning>
  )
}

export default VideoTesting
