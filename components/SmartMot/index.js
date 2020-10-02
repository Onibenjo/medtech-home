/* eslint-disable import/no-unresolved */
import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import smartmotimg from "../../public/smartmot.jpg"

const useStyles = makeStyles({
  smartmot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "2rem 0.5rem",
    background: "#ffffff",
    minHeight: "40vh",
  },
  smart_text: {
    padding: "3rem 0",
    marginRight: 16,
  },
  smart_coming_text: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    fontStyle: "italic",
    margin: "16px 3rem",
  },
  smartmot_container: {
    padding: "0 .3rem",
  },
  smartmot_img: {
    height: "16rem",
  },
  smart_img_container: {
    display: "flex",
    justifyContent: "center",
  },
})

export default function SmartMOT() {
  const classes = useStyles()

  return (
    <div className={classes.smartmot}>
      <h2 className={classes.title}>Wearable SmartMoT Device</h2>
      <Grid container className={classes.smartmot_container}>
        <Grid item md={7} xs={12}>
          <p className={classes.smart_text}>
            Real time vital signs monitoring for patient with undelying
            conditions like high blood pressure, asthma and other heart diseases
          </p>
        </Grid>
        <Grid item md={5} xs={12} className={classes.smart_img_container}>
          <img
            className={classes.smartmot_img}
            src={smartmotimg}
            alt="medtech device"
          />
        </Grid>
      </Grid>
      <span className={classes.smart_coming_text}>-coming soon</span>
    </div>
  )
}
