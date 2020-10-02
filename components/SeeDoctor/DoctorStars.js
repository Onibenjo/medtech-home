import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { MdStar } from "react-icons/md"

const useStyles = makeStyles({
  stars: {
    display: "flex",
    alignItems: "center",
    marginRight: 8,
    height: "100%",
  },
  starContainer: {
    display: "flex",
    alignItems: "center",
  },
})
const DoctorStars = ({ star }) => {
  const classes = useStyles()
  let starComp
  if (star === 1) {
    starComp = <MdStar color="#FEBF12" />
  } else if (star === 2) {
    starComp = (
      <span className={classes.starContainer}>
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
      </span>
    )
  } else if (star === 3) {
    starComp = (
      <span className={classes.starContainer}>
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
      </span>
    )
  } else if (star === 4) {
    starComp = (
      <span className={classes.starContainer}>
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
      </span>
    )
  } else if (star === 5) {
    starComp = (
      <span className={classes.starContainer}>
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
        <MdStar color="#FEBF12" />
      </span>
    )
  }
  return <div className={classes.stars}>{starComp}</div>
}

export default DoctorStars
