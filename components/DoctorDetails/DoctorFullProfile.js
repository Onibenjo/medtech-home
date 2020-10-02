import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import { MdArrowBack } from "react-icons/md"
import CardBody from "../Card/CardBody"

const useStyles = makeStyles({
  container: {},
})
const DoctorFullProfile = ({ doctor, onClick }) => {
  const classes = useStyles()
  if (!doctor) return null
  return (
    <div className={classes.container}>
      <Typography component="h6" variant="h6" align="center">
        <MdArrowBack
          onClick={onClick}
          style={{ cursor: "pointer", float: "left" }}
          fontSize={24}
        />
        Personal Details
      </Typography>
      <CardBody>
        <List>
          <ListItem>
            <ListItemText
              primary="Full Name"
              secondary={
                doctor.firstName
                  ? `${doctor.firstName} ${doctor.lastName}`
                  : null
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Sex"
              secondary={doctor.gender ? doctor.gender : null}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Specialty"
              secondary={doctor.specialty ? doctor.specialty : null}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Location"
              secondary={
                doctor.country ? `${doctor.country}, ${doctor.city}` : null
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Work Experience"
              secondary={doctor.experience ? doctor.experience : null}
            />
          </ListItem>
        </List>
      </CardBody>
    </div>
  )
}

export default DoctorFullProfile
