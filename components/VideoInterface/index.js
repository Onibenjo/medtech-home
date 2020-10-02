import React, { useState, useEffect } from "react"
import Slide from "@material-ui/core/Slide"
// import Dialog from "@material-ui/core/Dialog"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import { MdCallEnd, MdVolumeMute } from "react-icons/md"
import styles from "../../styles/VideoInterfaceStyle"
import image1 from "../../images/familyPlan.png"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const useStyles = makeStyles(styles)
const VideoInterface = () => {
  const classes = useStyles()
  const [appear, setAppear] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setAppear(false)
    }, 6000)
  }, [appear])
  return (
    <div>
      {/*    onClose={handleClose} */}
      <div
        className={classes.videoContainer}
        onClick={() => setAppear(!appear)}
      >
        <img src={image1} alt="" className={classes.firstPerson} />
        {appear && (
          <div className={classes.actionButtons}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              style={{ backgroundColor: "red" }}
            >
              <MdCallEnd style={{ color: "#fff" }} />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              style={{ backgroundColor: "#fff", marginLeft: 16 }}
            >
              <MdVolumeMute style={{ color: "#00a8e1" }} />
            </IconButton>
          </div>
        )}
        <img src={image1} alt="" className={classes.secondPerson} />
      </div>
    </div>
  )
}

export default VideoInterface
