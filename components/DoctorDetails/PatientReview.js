import React from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
)

export default function AlignItemsList({ reviews }) {
  const classes = useStyles()
  // return <p>dii</p>
  return (
    <List className={classes.root}>
      {reviews.map(
        (
          { reviewNote: review, patientImage: image, patientName: name, id },
          i
        ) => (
          <>
            <ListItem alignItems="flex-start" key={id}>
              <ListItemAvatar>
                <Avatar alt={name} src={image} />
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {review}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {i < reviews.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </>
        )
      )}
    </List>
  )
}

// export default PatientReview
