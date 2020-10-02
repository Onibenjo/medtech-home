import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import fetchApi from "utils/lib/fetchApi"
import { useSnackbar, SnackbarProvider } from "notistack"
import hasEmptyValue from "utils/lib/hasEmptyValue"
import { FiSend } from "react-icons/fi"
import Layout from "components/Layout/Layout"
import SEO from "components/SEO"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 780,
    margin: "2rem auto",
    minHeight: "90vh",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: theme.shadows[0],
    padding: theme.spacing(2, 4, 3),
    "& > button": {
      margin: ".8rem 0",
      color: theme.palette.secondary.dark,
    },
  },
}))

const initialValues = {
  name: "",
  email: "",
  company: "",
  proposal: "",
}
const PartnerWithUsPage = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [inputs, setInputs] = useState(initialValues)
  const [submitting, setSubmitting] = useState(false)
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    if (inputs.email && inputs.proposal && inputs.name) {
      fetchApi("/partner-with-us", {
        body: inputs,
      })
        .then(() => {
          enqueueSnackbar("Message sent successfully", {
            variant: "success",
          })
          setInputs(initialValues)
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
    setSubmitting(false)
  }

  return (
    <>
      <SEO
        title="Partner With Us | Medtech Africa"
        desc="Become a partner of Medtech Africa"
        canonical="https://medtech.africa/partner"
      />
      <Layout>
        <div className={classes.container}>
          {submitting ? (
            <p>Submitting...</p>
          ) : (
            <form className={classes.paper} onSubmit={handleSubmit}>
              <h2 id="transition-modal-title">Partner With Us</h2>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                value={inputs.name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                value={inputs.email}
                onChange={handleChange}
              />
              <TextField
                //   margin="dense"
                id="company"
                label="Company Name"
                type="text"
                fullWidth
                value={inputs.company}
                onChange={handleChange}
              />
              <TextField
                id="proposal"
                label="Proposal"
                multiline
                rows="5"
                fullWidth
                value={inputs.proposal}
                onChange={handleChange}
              />
              <Button
                onClick={handleSubmit}
                disabled={hasEmptyValue(inputs)}
                color="secondary"
                //   variant="outlined"
                size="large"
                type="submit"
                endIcon={<FiSend size={10} />}
              >
                Submit
              </Button>
            </form>
          )}
        </div>
      </Layout>
    </>
  )
}

export default () => (
  <SnackbarProvider>
    <PartnerWithUsPage />
  </SnackbarProvider>
)
