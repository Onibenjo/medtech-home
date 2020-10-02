import React from "react"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import { db } from "utils/lib/firebase"

const useStyles = makeStyles((theme) => ({
  root: {
    maxwidth: 0,
    margin: "16px 0",
  },
  content: {
    color: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    paddingBottom: 0,
  },
  cover: {
    width: 64,
    height: 55,
    margin: " 16px 0 16px 16px ",
    borderRadius: "50%",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 20,
    marginRight: 15,
  },
  header: {
    backgroundColor: "#00a8e1",
  },
  patientbtn: {
    marginLeft: "0px",
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
    },
  },
}))
export default function IncomingAppointment({
  image,
  name,
  handleClickOpen,
  handleAccept,
  date,
  reason,
  id,
  setLoad,
}) {
  const onDecline = async () => {
    await db.collection("appointments").doc(id).update({ status: "declined" })
    setLoad(true)
  }
  const classes = useStyles()
  return (
    <div style={{ maxwidth: 376 }}>
      <Card className={classes.root}>
        <CardHeader className={classes.header} title="Appointment Request" />
        <div style={{ display: "flex" }}>
          <CardMedia className={classes.cover} image={image} title={name} />
          <CardContent className={classes.content}>
            <div>
              <Typography component="h5" variant="h6">
                {name}
              </Typography>
              <Typography component="p" variant="subtitle1">
                App. Date - {date}
              </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                color="textSecondary"
              >
                App. Reason - {reason}
              </Typography>
            </div>
            <div className={classes.patientbtn}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Patient Details
              </Button>
            </div>
          </CardContent>
        </div>
        <div className={classes.button}>
          <Button variant="contained" onClick={handleAccept} color="primary">
            Accept
          </Button>
          <Button
            variant="contained"
            onClick={onDecline}
            style={{ marginLeft: 16, backgroundColor: "#f22f46" }}
          >
            Decline
          </Button>
        </div>
      </Card>
    </div>
  )
}
