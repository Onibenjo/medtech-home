import { useState } from "react"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { MdEmail, MdPhone } from "react-icons/md"
import { useSnackbar } from "notistack"
import Button from "../CustomButtons/Button.js"
import CustomInput from "../CustomInput/CustomInput.js"
import styles from "../../styles/ContactStyles"

const useStyles = makeStyles(styles)

export default function Contact() {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [status, setStatus] = useState(false)
  const [inputs, setInputs] = useState({
    email: "",
    message: "",
    name: "",
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
        .catch(() => {
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
      <Grid item xs={12} sm={4} md={7} className={classes.image}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1973.076570472567!2d4.597034744995404!3d8.484486710257615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x675caa4b77655105!2sdHub%20Nigeria!5e0!3m2!1sen!2sng!4v1576917550888!5m2!1sen!2sng"
          title="Google Map"
          //   width="600"
          //   height="450"
          frameBorder="0"
          style={{ border: "0", height: "100%", width: "100%" }}
          allowFullScreen=""
        />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
          <a href="mail-to:medtechafr@gmail.com">
            <div className={classes.contact}>
              <MdEmail color="" size={30} />
              <span>contact@medtech.africa</span>
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
    </Grid>
  )
}
