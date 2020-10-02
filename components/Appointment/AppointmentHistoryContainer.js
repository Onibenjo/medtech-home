import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import { MdHistory } from "react-icons/md"

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    backgroundColor: "#EEEDED",
    marginBottom: 16,
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

export default function AppointmentHistoryContainer({
  doctorName,
  date,
  time,
}) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cover}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <MdHistory />
          </Avatar>
        }
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="body2" color="textPrimary">
            {doctorName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {date}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {time}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}
