import React from "react"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"

import styles from "../../styles/SmartStyles"
// import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles(styles)

function Smart() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      {/* <div className={classes.imagecontainer}>
        <div className={classes.image}></div>
      </div>{" "} */}
      <img className={classes.media} src="product 2.jpeg" alt="smartMot" />
      <div className={classes.list}>
        <h2 className={classes.header}>HOW TO USE</h2>
      </div>
      <List className={classes.root}>
        <ListItem
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <ListItemText primary="Attach the cuff to arm" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText primary="Place the temperature sensor to ear" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText primary="Click Send Vitals" />
        </ListItem>
      </List>
    </div>
  )
}

export default Smart
