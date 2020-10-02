import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Button from "../CustomButtons/Button"
import styles from "../../styles/RegisterStyle"
import CardBody from "../Card/CardBody.js"
import Terms from "../Terms/Terms"
import CardFooter from "../Card/CardFooter.js"
import CardHeader from "../Card/CardHeader.js"
import Iagree from "./Iagree"

const RegisterPage3 = ({
  firstName,
  lastName,
  email,
  gender,
  // phoneNumber,
  // dob,
  country,
  // state,
  onEditClick,
  handleSubmit,
}) => {
  const [agree, setAgree] = useState(true)
  const [open, setOpen] = useState(false)
  const useStyles = makeStyles(styles)
  const classes = useStyles()

  return (
    <div>
      <Terms open={open} onClose={() => setOpen(false)} />
      <CardHeader className={classes.cardHeader}>
        <h3
          style={{
            textAlign: "center",
          }}
        >
          Confirm your details
        </h3>
      </CardHeader>
      <CardBody>
        <List>
          <ListItem>
            <ListItemText
              primary="Full Name"
              secondary={`${lastName} ${firstName}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="E-mail" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Gender" secondary={gender} />
          </ListItem>
          {/* <ListItem>
            <ListItemText
              primary="Phone Number"
              secondary={country && `${country.phone} ${phoneNumber}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Date of Birth" secondary={dob} />
          </ListItem> */}
          <ListItem>
            <ListItemText
              primary="Country"
              secondary={country && country.label}
            />
          </ListItem>
          {/* <ListItem>
            <ListItemText primary="State" secondary={state} />
          </ListItem> */}
        </List>
        <Iagree setAgree={setAgree} setOpen={setOpen} agree={agree} />
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <Button simple color="primary" size="lg" onClick={onEditClick}>
          Edit
        </Button>
        <Button
          simple
          color="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={agree}
        >
          Submit
        </Button>
      </CardFooter>
    </div>
  )
}

export default RegisterPage3
