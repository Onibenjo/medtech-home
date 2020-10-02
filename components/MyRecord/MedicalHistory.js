import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Avatar from "@material-ui/core/Avatar"
import { db } from "utils/lib/firebase"
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi"

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    backgroundColor: "#EEEDED",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  content: {
    flex: "1 0 auto",
    paddingBottom: "16px !important",
  },
  cover: {
    padding: "0 0 0 16px",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  avatar: {
    backgroundColor: "#03D170",
  },
}))

export default function MediaControlCard({
  icon,
  call,
  doctorId,
  date,
  callTime,
  rest,
}) {
  const classes = useStyles()
  const [doctorName, setDoctorNme] = useState("")
  useEffect(() => {
    const fetchDoctorName = async () => {
      const doctor = await db.collection("doctors").doc(doctorId).get()
      const doctorDetails = doctor.data()
      setDoctorNme(`${doctorDetails.firstName} ${doctorDetails.lastName}`)
    }
    fetchDoctorName()
  }, [doctorId])

  return (
    <Grid item md={12} {...rest}>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cover}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {icon}
            </Avatar>
          }
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div style={{ display: "flex" }}>
              {callTime === "accepted" ? (
                <FiArrowUpRight size={24} color="green" />
              ) : (
                <FiArrowDownRight size={24} color="red" />
              )}
              {call ? (
                <Typography
                  variant="h6"
                  style={{ marginLeft: 8 }}
                  component="h6"
                  color="textPrimary"
                >
                  Dr {doctorName}
                </Typography>
              ) : null}
            </div>
            <Typography component="p" variant="body2" color="textSecondary">
              {date}
            </Typography>
            {/* <Typography variant="body2" component="p" color="textSecondary">
              {callTime}
            </Typography> */}
          </CardContent>
        </div>
      </Card>
    </Grid>
  )
}
