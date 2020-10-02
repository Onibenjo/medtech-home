import React from "react"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
// import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Chip from "@material-ui/core/Chip"
import { MdAdd, MdRemove } from "react-icons/md"
// import Button from "components/CustomButtons/Button"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      fontFamily: "Poppins",
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
    defaultChip: {
      color: theme.palette.grey[800],
      background: theme.palette.grey[200],
      fontWeight: 500,
      "&:hover": {
        background: "inherit",
      },
    },
    activeChip: {
      //   color: theme.palette.secondary.dark,
      color: "rgba(53,89,209,1)",
      background: "#DADDFF",
      //   background: theme.palette.grey[300],
      fontWeight: 500,
      "&:hover": {
        background: "inherit",
        color: "inherit",
      },
    },
    titleRoot: {
      color: theme.palette.grey[100],
      background: "rgba(53,89,209,1)",
      //   background: theme.palette.secondary.dark,
      padding: `${theme.spacing(5)}px 2rem`,
      textTransform: "lowercase",
    },
  })
)

const AddDrug = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState<boolean>(false)
  const [dosage, setDosage] = React.useState<number>(1)
  const [duration, setDuration] = React.useState<number>(1)
  const [repeat, setRepeat] = React.useState<string>("Everyday")
  const [timeOfDay, setTimeOfDay] = React.useState<string[]>([])
  const [toBeTaken, setToBeTaken] = React.useState<string>("After Food")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.container}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        // fullWidth
        // maxWidth="md"
      >
        <DialogTitle
          id="form-dialog-title"
          classes={{ root: classes.titleRoot }}
        >
          {`${dosage} tablet${
            dosage > 1 ? "s" : ""
          } ${repeat} for ${duration} week${
            duration > 1 ? "s" : ""
          } in the ${timeOfDay.join(", ")} ${toBeTaken}`}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
           
          </DialogContentText> */}
          <Grid container>
            <Grid item sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="medicine"
                label="Medecine Name"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                margin="dense"
                id="medicine"
                label="Strength"
                type="text"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={6}>
              <Typography variant="caption" display="block">
                Dosage
              </Typography>
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() =>
                  dosage > 1 && setDosage((d) => (d <= 0 ? 1 : d - 1))
                }
                // onClick={() => setDosage((d) => (d <= 0 ? 1 : d - 1))}
              >
                <MdRemove />
              </IconButton>
              <Typography display="inline">{dosage} tablet</Typography>
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => setDosage((d) => d + 1)}
              >
                <MdAdd />
              </IconButton>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="caption" display="block">
                Duration (Week)
              </Typography>
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => setDuration((d) => (d <= 1 ? 1 : d - 1))}
              >
                <MdRemove />
              </IconButton>
              <Typography display="inline">{duration} week</Typography>
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => setDuration((d) => d + 1)}
              >
                <MdAdd />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="caption">Repeat</Typography>
          <div className={classes.root}>
            {["Everyday", "Alternate Days", "Specific Days"].map((day, i) => (
              <Chip
                key={day + i}
                label={day}
                color="secondary"
                onClick={() => setRepeat(day)}
                classes={{
                  colorSecondary:
                    day === repeat ? classes.activeChip : classes.defaultChip,
                }}
              />
            ))}
            {repeat !== "Everyday" && (
              <TextField
                autoFocus
                margin="dense"
                id="repeat"
                label="Enter Day(s)"
                type="text"
                onChange={(e) => setRepeat(e.target.value)}
              />
            )}
          </div>
          <Typography variant="caption">Time of day</Typography>
          <div className={classes.root}>
            {["Morning", "Noon", "Evening", "Night"].map((day, i) => (
              <Chip
                key={day + i}
                label={day}
                color="secondary"
                onClick={() =>
                  setTimeOfDay((prev) =>
                    !prev.includes(day)
                      ? [...prev, day]
                      : prev.filter((item) => item !== day)
                  )
                }
                classes={{
                  colorSecondary: timeOfDay.includes(day)
                    ? classes.activeChip
                    : classes.defaultChip,
                }}
              />
            ))}
          </div>
          <Typography variant="caption">To be taken</Typography>
          <div className={classes.root}>
            {["Before Food", "After Food"].map((time, i) => (
              <Chip
                key={i + time}
                label={time}
                color="secondary"
                onClick={() => setToBeTaken(toBeTaken !== time ? time : "")}
                classes={{
                  colorSecondary:
                    toBeTaken === time
                      ? classes.activeChip
                      : classes.defaultChip,
                }}
              />
            ))}
          </div>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary">
            Add Drug
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddDrug
