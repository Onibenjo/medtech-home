import React from "react"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  content: {
    color: "rgba(0,0,0,0.6)",
    flex: "1 0 auto",
    paddingBottom: "8px",
    paddingTop: "8px",
    textAlign: "center",
  },
  cover: {
    width: "7rem",
    height: "7rem",
    margin: "8px auto",
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
  handleClickOpen,
  details,
  patient,
  name,
  date,
  reason,
  image,
}) {
  // const [open, setOpen] = React.useState(false)

  const classes = useStyles()
  return (
    <div style={{ maxwidth: 376 }}>
      <Card>
        <CardMedia
          className={classes.cover}
          image={image}
          title={patient ? "Doctor picture" : "Patient picture"}
          justify="center"
        />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h6">
            {name}
          </Typography>
          <Typography variant="subtitle1" component="p" color="textSecondary">
            {date}
          </Typography>
          {details && (
            <div className={classes.patientbtn}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Patient Details
              </Button>
            </div>
          )}

          <Typography variant="subtitle1" component="p" color="textSecondary">
            {reason}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
