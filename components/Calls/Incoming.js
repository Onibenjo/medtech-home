import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
// import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop"
// import Check from "../../images/check.png";
import { Dialog, Avatar, IconButton } from "@material-ui/core"
import { FaCheckCircle } from "react-icons/fa"
import { MdCancel } from "react-icons/md"
import fetchWithToken from "utils/lib/fetch"

import { useAuth } from "utils/use-auth"
// import Button from "../CustomButtons/Button.js"
import { useRouter } from "next/router"
import paths from "paths"
import useAudio from "hooks/useAudio"
// import Image3 from "../../images/imagepic.png"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    // position: "fixed",
    // overflow: "hidden",
  },
  paper: {
    backgroundColor: "#121414",
    color: "white",
    height: "100%",
    width: "400px",
    borderStyle: "inherit",
    overflow: "hidden",
    fontSize: "20px",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(3, 0, 0, 15),
  },
}))

export default function TransitionsModal({
  open,
  handleClose,
  id,
  image,
  name,
}) {
  const classes = useStyles()
  const {
    user: { uid, thumbnail },
  } = useAuth()
  const router = useRouter()
  const { play, toggle, pause } = useAudio("/audio/calling.mp3", { loop: true })

  useEffect(() => {
    if (open) play()

    return () => pause()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, play])

  const handleCall = async (status) => {
    try {
      const data = await fetchWithToken("/user/respond-call", {
        body: { id, status, thumbnail },
      })
      if (data.success && status === "reject") {
        toggle()
        handleClose()
        return
      }
      router.push({
        pathname: paths.doctorRoom,
        query: { room: `${id}-${uid}`, token: data.token },
      })
    } catch (_) {
      // eslint-disable-next-line no-console
      console.error(_)
    }
  }

  useEffect(() => {
    router.prefetch(paths.doctorRoom)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <Avatar src={image} alt="person" className={classes.large} />
          <p>Incoming call..</p>
          <h2 style={{ fontFamily: "Times New Roman" }}>{name}</h2>
          <span
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "",
            }}
          >
            <IconButton onClick={() => handleCall("reject")}>
              <MdCancel style={{ fontSize: "60px", color: "red" }} />
            </IconButton>
            <IconButton onClick={() => handleCall("accept")}>
              <FaCheckCircle style={{ fontSize: "50px", color: "#1070c9" }} />
            </IconButton>
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "space-around",
              fontSize: "15px",
            }}
          >
            <p style={{ marginTop: "0px" }}>Decline</p>
            <p style={{ marginTop: "0px" }}>Accept</p>
          </span>
        </div>
      </Dialog>
    </div>
  )
}
