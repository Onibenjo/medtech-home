import { useState } from "react"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { MdEmail, MdPhone } from "react-icons/md"
import { useSnackbar } from "notistack"
import { useAuth } from "../../utils/use-auth"
import styles from "../../styles/ContactStyles"
import Button from "../CustomButtons/Button.js"
import CustomInput from "../CustomInput/CustomInput.js"

const useStyles = makeStyles(styles)

export default function Support() {
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()
  const classes = useStyles()
  const [status, setStatus] = useState(false)
  const [inputs, setInputs] = useState({
    email: user.email || "",
    message: "",
    name: user.displayName || "",
  })

  const handleOnChange = (e) => {
    e.persist()
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
    setStatus(false)
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (inputs.email && inputs.message && inputs.name) {
      setStatus(true)
      fetch("https://formspree.io/mbjkndwo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(inputs),
      })
        .then((resp) => resp.json())
        .then((response) => {
          if (response.error) {
            throw response.error
          }
          enqueueSnackbar("Message sent successfully", {
            variant: "success",
          })
          setStatus(false)
          setInputs({
            email: "",
            message: "",
            name: "",
          })
        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar("An error occured. Please try again!", {
            variant: "error",
          })
        })
    } else {
      enqueueSnackbar("All fields required", {
        variant: "error",
      })
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={1} sm={2} md={3} />
      <Grid item xs={10} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <CustomInput
              labelText="Email Address"
              id="email"
              formControlProps={{
                fullWidth: true,
                required: true,
                variant: "outlined",
              }}
              inputProps={{
                value: inputs.email,
                onChange: (e) => handleOnChange(e),
                type: "email",
                name: "_replyto",
              }}
            />
            <CustomInput
              labelText="Name..."
              id="name"
              formControlProps={{
                fullWidth: true,
                required: true,
                variant: "outlined",
              }}
              inputProps={{
                value: inputs.name,
                onChange: (e) => handleOnChange(e),
                type: "text",
                name: "name",
              }}
            />
            <CustomInput
              labelText="Message..."
              id="message"
              formControlProps={{
                fullWidth: true,
                required: true,
                variant: "outlined",
              }}
              inputProps={{
                value: inputs.message,
                onChange: (e) => handleOnChange(e),
                type: "text",
                name: "message",
                multiline: true,
                rows: "4",
              }}
            />
            <Button
              type="submit"
              className={classes.submit}
              block
              color="primary"
              size="lg"
              fullWidth
              onClick={handleOnSubmit}
              disabled={status}
            >
              Submit
            </Button>
          </form>
          <a href="mail-to:support@medtech.africa">
            <div className={classes.contact}>
              <MdEmail color="" size={30} />
              <span>support@medtech.africa</span>
            </div>
          </a>
          <a href="tel:08163602212">
            <div className={classes.contact}>
              <MdPhone color="" size={30} />
              <span>+234 8163602212</span>
            </div>
          </a>
        </div>
      </Grid>
      <Grid item xs={1} sm={2} md={3} />
    </Grid>
  )
}
