import React from "react"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import { FcOvertime } from "react-icons/fc"
import Avatar from "@material-ui/core/Avatar"
import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles(() => ({
  content: {
    color: "rgba(0,0,0,0.6)",
    flex: "1 0 auto",
    paddingBottom: "8px",
    paddingTop: "8px",
  },
  cover: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 20,
    marginRight: 15,
  },
  patientbtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 1rem 0 1rem",
    "& > h5": {
      marginLeft: ".5rem",
    },
  },
  reason: {
    padding: "1rem 0",
    fontSize: ".9rem",
  },
  date: {
    display: "flex",
    flexWrap: "wrap",
    padding: ".5rem 0",
    "& > p": {
      marginLeft: ".5rem",
    },
  },
}))

export default function UpcomingCard({
  handleClickOpen,
  details,
  name,
  date,
  reason,
  image,
}) {
  // const [open, setOpen] = React.useState(false)

  const classes = useStyles()
  return (
    <div>
      <Card>
        <div className={classes.header}>
          <Avatar src={image} alt={name} sizes="60" />
          <Typography component="h5" variant="h6">
            {name}
          </Typography>
        </div>
        <CardContent className={classes.content}>
          <Divider />
          <div className={classes.date}>
            <FcOvertime size="30" />{" "}
            <Typography variant="subtitle1" component="p" color="secondary">
              {date}
            </Typography>
          </div>
          <Divider />
          <div className={classes.reason}>
            <Typography variant="body1" color="textPrimary">
              {reason}
            </Typography>
          </div>
          {details && (
            <div className={classes.patientbtn}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
              >
                View Details
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
