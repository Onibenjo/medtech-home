import { makeStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import { MdLocationOn } from "react-icons/md"

const useStyles = makeStyles(() => ({
  root1: {
    display: "flex",
    alignItems: "center",
    borderRadius: "15px",
    padding: "8px",
  },
  content1: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  content2: {
    marginTop: 8,
  },
  cover: {
    width: "11rem",
    height: "10rem",
    borderRadius: 8,
  },
}))

export default function MediaControlCard({ name, address, dob, img, gender }) {
  const classes = useStyles()

  return (
    <div className={classes.root1}>
      <CardMedia className={classes.cover} image={img} title={name} />
      <CardContent className={classes.content1}>
        <Typography component="h3" variant="h6">
          {name}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Date Of Birth: {dob}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {gender}
        </Typography>
        <Typography component="p" className={classes.content2} variant="body1">
          <MdLocationOn /> {address}
        </Typography>
      </CardContent>
    </div>
  )
}
