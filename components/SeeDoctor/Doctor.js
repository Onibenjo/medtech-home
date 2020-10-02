import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { MdLocationOn } from "react-icons/md"
// import DoctorStars from "./DoctorStars"
import UserAvatar from "components/Dashboard/UserAvatar/UserAvatar"
import isProd from "utils/lib/isProd"
import StarRating from "../StarRating"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // backgroundColor: "#EEEDED",
    backgroundColor: "#ffffff",
    marginBottom: 16,
    padding: ".5rem 1rem .5rem",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    flexWrap: "wrap",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      padding: "1.5rem 1rem 1.5rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      alignContent: "center",
      justifyItems: "center",
      whiteSpace: "nowrap",
      textAlign: "center",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  content: {
    flex: "1 0 auto",
    padding: "1px",
    [theme.breakpoints.up("xs")]: {
      paddingBottom: "16px !important",
    },
    "&:first-child": {
      fontWeight: 600,
    },
  },
  cover: {
    width: 60,
    height: 60,
    margin: "0 16px 0 0",
    borderRadius: "50%",
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1),
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  },
  avatar: {
    width: 60,
    height: 60,
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  location: {
    display: "flex",
    alignItems: "center",
  },
  online: {
    height: 8,
    width: 8,
    position: "absolute",
    right: 10,
    top: 10,
    borderRadius: "50%",
  },
  volunteer: {
    position: "absolute",
    right: 10,
    bottom: 10,
    margin: 0,
    color: "green",
    fontWeight: 600,
    fontSize: 15,
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      textAlign: "center",
      marginTop: 16,
    },
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 16,
  },
  starRating: {
    marginLeft: "auto",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
}))

const Doctor = ({
  online,
  image,
  doctorname,
  specialty,
  location,
  star,
  specialtyDesc,
  service,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Grid item md={12} lg={12} xl={6}>
      <Card className={classes.root} {...props}>
        <span
          className={classes.online}
          style={{ backgroundColor: online ? "#01dc6b" : "#d7d7d7" }}
        />

        <CardMedia
          className={classes.cover}
          // image={image}
          title={`Dr ${doctorname}`}
        >
          <UserAvatar
            aria-label={doctorname}
            user={{ displayName: doctorname, thumbnail: image, online }}
            className={classes.avatar}
          />
        </CardMedia>

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="body2" color="textPrimary">
              {doctorname}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {specialty}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span className={classes.location}>
                <MdLocationOn />
                {location}
              </span>
            </Typography>
          </CardContent>
        </div>
        {!isProd && (
          <div>
            {/* {specialtyDesc && (
              <CardMedia className={classes.image} image={specialtyImage} />
            )} */}
            {specialtyDesc && (
               <Typography variant="body2" color="textSecondary">
               {specialtyDesc}
             </Typography>
            )}
          </div>
        )}
        <div className={classes.starRating}>
          {/* <DoctorStars star={star} /> */}
          <StarRating rating={star} />
        </div>
        {service === "volunteer" && (
          <p className={classes.volunteer}>Volunteer/Free</p>
        )}
      </Card>
    </Grid>
  )
}
export default Doctor
