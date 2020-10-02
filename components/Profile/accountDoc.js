import React from "react"
// import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Dialog from "@material-ui/core/Dialog"
import { getDocLayout } from "components/Account/AccountLayout"
// import Typography from '@material-ui/core/Typography';
import { IoMdArrowDropright, IoIosAddCircle } from "react-icons/io"

export default function AccountDoctor() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleListItemClick = () => {
    setOpen(false)
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClickOpen}
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          padding: "5px",
          color: "#03d170",
        }}
      >
        Switch Bank Account <IoMdArrowDropright style={{ fontSize: "15px" }} />{" "}
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <List>
          <ListItem autoFocus button onClick={handleListItemClick}>
            <ListItemAvatar>
              <IoIosAddCircle style={{ color: "#03d170", fontSize: "40px" }} />
            </ListItemAvatar>
            <ListItemText style={{ color: "#03d170" }} primary="Add New" />
          </ListItem>

          {/* <ListItem button>
            <ListItemAvatar>
            <IoMdCheckmark style={{color:"#03d170"}}/>
            </ListItemAvatar>
            <ListItemText />
          </ListItem> */}
        </List>
      </Dialog>
    </div>
  )
}
AccountDoctor.getLayout = getDocLayout
