import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import CardActionArea from "@material-ui/core/CardActionArea"
import chatBot from "./images/chatbot.jpg"

const useStyles = makeStyles(() => ({
  details: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "content-box",
  },
  content: { padding: "5px 1.7rem" },
  cover: {
    height: 200,
    width: "100%",
  },
}))

export default function MediaControlCard() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.cover} image={chatBot} title="ChatBot" />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            AI Obus
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Our Artificial Intelligence program helps us predict and understand
            future Health conditions and needs of our patients.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
