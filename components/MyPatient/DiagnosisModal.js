import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
// import Typography from "@material-ui/core/Typography"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles({
  container: {
    fontFamily: "Poppins",
  },
})

const DiagnosisModal = ({ setOpen, open, details }) => {
  const classes = useStyles()
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className={classes.container}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Diagnosis Details</DialogTitle>
        <DialogContent>
          {details.map((det, i) => (
            <List key={i} dense>
              <ListItem>
                <ListItemText primary="Drug Name" secondary={det.drugName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Strength" secondary={det.strength} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Instruction"
                  secondary={det.instructions}
                />
              </ListItem>
              <Divider />
            </List>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DiagnosisModal
